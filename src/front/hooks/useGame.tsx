import { useMachine } from "@xstate/react";
import { createContext, PropsWithChildren, useCallback, useContext } from "react";
import { GameMachine } from "../../machine/gameMachine";
import { GameContext, GameEvent, GameEvents, GameStates, Player, PlayerColor } from "../../types";
import { getSession } from "../func/session";

type GameContextType = {
    state: GameStates,
    context: GameContext,
    send: <T extends GameEvents["type"]>(event: {type: T, playerId?: string, name?: string, color?: PlayerColor, x?: number} & Omit<GameEvent<T>, 'playerId'>) => void,
    can: <T extends GameEvents["type"]>(event: {type: T, playerId?: string} & Omit<GameEvent<T>, 'playerId'>) => boolean,
    playerId: Player["id"],
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const Context = createContext<GameContextType>({} as any);

export function useGame(): GameContextType {
  return useContext(Context);
}

export function GameContextProvider ({ children }: PropsWithChildren) {
    const [state, send] = useMachine(GameMachine);
    const playerId = getSession()?.id ?? '';
    const sendWithPlayer = useCallback<GameContextType["send"]>(
        (event) => send({playerId, ...event} as GameEvents), 
        [send, playerId]
    );
    const can = useCallback<GameContextType["can"]>(
        (event) => !!GameMachine.transition(state, {playerId, ...event} as GameEvents).changed, 
        [state, playerId]
    );
    return <Context.Provider value={{
        playerId,
        state: state.value as GameStates,
        context: state.context,
        send: sendWithPlayer,
        can: can
    }}>
        {children}
    </Context.Provider>
}