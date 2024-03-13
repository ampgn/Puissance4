import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";
import { InterpreterFrom } from "xstate";
import { GameMachine, makeGame } from "../../machine/gameMachine";
import { GameContext, GameEvent, GameEvents, GameStates, Player, PlayerColor, PlayerSession, QueryParams, ServerErrors } from "../../types";
import { getSession, logout } from "../func/session";
import { urlSearchParams } from "../func/url";

type GameContextType = {
    state: GameStates,
    context: GameContext,
    connect: (session: PlayerSession, gameId: string) => void,
    send: <T extends GameEvents["type"]>(event: {type: T, playerId?: string, name?: string, color?: PlayerColor, x?: number} & Omit<GameEvent<T>, 'playerId'>) => void,
    can: <T extends GameEvents["type"]>(event: {type: T, playerId?: string, x?: number} & Omit<GameEvent<T>, 'playerId'>) => boolean,
    playerId: Player["id"],
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const Context = createContext<GameContextType>({} as any);

export function useGame(): GameContextType {
  return useContext(Context);
}

export function GameContextProvider ({ children }: PropsWithChildren) {
    const [machine, setMachine] = useState<InterpreterFrom<typeof GameMachine>>(makeGame());
    const [playerId, setPlayerId] = useState('');
    const [socket, setSocket] = useState<ReconnectingWebSocket | null>(null);
    const sendWithPlayer = useCallback<GameContextType["send"]>((event) => {
            const eventWithPlayer = {playerId, ...event};
            socket?.send(JSON.stringify({ type: 'gameUpdate', event: eventWithPlayer }))
        }, [playerId]
    );
    const can = useCallback<GameContextType["can"]>(
        (event) => !!GameMachine.transition(machine?.state, {playerId, ...event} as GameEvents).changed, 
        [machine?.state, playerId]
    );
    const connect: GameContextType["connect"] = (session, gameId) => {
        const searchParams = new URLSearchParams({
            ...session,
            gameId
        });
        setPlayerId(session.id)
        const socket =  new ReconnectingWebSocket(
            `${window.location.protocol.replace('http', 'ws')}//${window.location.host}/ws?${searchParams.toString()}`
        )
        setSocket(socket)
    };

    useEffect(() => {
        if (!socket) {
            const gameId = urlSearchParams().get(QueryParams.GAMEID);
            const session = getSession();
            if (gameId && session) {
                connect(session, gameId)
                setPlayerId(session.id)
            }
            return;
        }
        const onMessage = (event: MessageEvent) => {
            const message = JSON.parse(event.data);
            if (message.type === 'error' && message.code === ServerErrors.AuthError) {
                logout()
                setPlayerId('')
            } else if (message.type === 'gameUpdate') {
                setMachine(makeGame(message.state, message.context))
            }
        };
        socket.addEventListener('message', onMessage)
        return () => {
            socket.removeEventListener('message', onMessage)
        }

    }, [socket])

    return <Context.Provider value={{
        playerId,
        state: machine?.state.value as GameStates,
        context: machine?.state.context,
        send: sendWithPlayer,
        can,
        connect
    }}>
        {children}
    </Context.Provider>
}