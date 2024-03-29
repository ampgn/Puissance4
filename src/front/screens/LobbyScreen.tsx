import { prevent } from "../../func/dom";
import { PlayerColor } from "../../types";
import { ColorSelector } from "../component/ColorSelector";
import { useGame } from "../hooks/useGame";

type LobbyScreenProps = {
    // ...
}

// eslint-disable-next-line no-empty-pattern
export function LobbyScreen ({}: LobbyScreenProps) {
    const {send, context, can} = useGame();
    const colors = [PlayerColor.YELLOW, PlayerColor.RED];

    const chooseColor = (color: PlayerColor) => send({ type: 'chooseColor', color});
    const startGame = () => send({type: 'start'});
    const canStart = can({type: 'start'});

    return <div>
        <ColorSelector onSelect={chooseColor} players={context.players} colors={colors} />
        <p className="startButton">
            <button className="button" disabled={!canStart} onClick={prevent(startGame)}>Démarrer</button>
        </p>
    </div>
}