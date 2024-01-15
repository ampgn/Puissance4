import { useMachine } from "@xstate/react"
import { createContext, PropsWithChildren, useContext } from "react"
import { GameMachine } from "../../machine/gameMachine"
import { GameContext, GameEvent, GameEvents, GameStates, Player } from "../../types"

type GameContextType = {
    state: GameStates,
    context: GameContext,
    send: <T extends GameEvents["type"]>(event: {type: T, playerId?: string} & Omit<GameEvent<T>, "playerId">) => void,
    can:  <T extends GameEvents["type"]>(event:  {type: T, playerId?: string} & Omit<GameEvent<T>, "playerId">) => boolean,
    playerId: Player['id']
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const Context = createContext<GameContextType>({} as any)

export function useGame(): GameContextType {
    return useContext(Context)
}

export function GameContextProvider ({children}: PropsWithChildren) {
    const [state, send] = useMachine(GameMachine)
    const playerId = state.context.currentPlayer ?? ''
    return <Context.Provider value={{
        playerId,
        state: state.value as GameStates,
        context: state.context,
        send: (event) => send({playerId, ...event} as GameEvents),
        can: (event) => !!GameMachine.transition(state, {playerId, ...event} as GameEvents).changed
    }}>
        {children}
    </Context.Provider>
}