import { currentPlayer } from "../../func/game"
import { useGame } from "../hooks/useGame"
import { Victory } from "../component/Victory"

type VictoryScreenProps = {
    // ...
}

// eslint-disable-next-line no-empty-pattern
export function VictoryScreen ({}: VictoryScreenProps) {
    const {context, send} = useGame()
    const player = currentPlayer(context)
    const restart = () => send({ type: 'restart' })
    return <div>
        <Victory color={player.color!} name={player.name} onRestart={restart} />
    </div>
}