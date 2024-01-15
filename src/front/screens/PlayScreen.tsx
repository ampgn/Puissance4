import { currentPlayer } from "../../func/game"
import { GameInfo } from "../component/GameInfo"
import { useGame } from "../hooks/useGame"

type PlayScreenProps = {
    // ...
}

// eslint-disable-next-line no-empty-pattern
export function PlayScreen ({}: PlayScreenProps) {
    const {context} = useGame()
    const player = currentPlayer(context)!

    return <div>
        <GameInfo color={player.color!} name={player.name} />
    </div>
}