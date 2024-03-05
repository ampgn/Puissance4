import { prevent } from "../../func/dom";
import { PlayerColor } from "../../types";
import { ColorSelector } from "../component/ColorSelector";
import { NameSelector } from "../component/NameSlector";
import { useGame } from "../hooks/useGame";

type LobbyScreenProps = {
    // ...
}

// eslint-disable-next-line no-empty-pattern
export function LobbyScreen ({}: LobbyScreenProps) {
    const {send, context, can} = useGame();
    const colors = [PlayerColor.YELLOW, PlayerColor.RED];

    const joinGame = (name: string) => send({ type: 'join', name: name, playerId: name });
    const chooseColor = (color: PlayerColor) => send({ type: 'chooseColor', color, playerId: color === PlayerColor.YELLOW ? 'John' : 'Marc' });
    const startGame = () => send({type: 'start'});
    const canStart = can({type: 'start'});

    return <div>
        <NameSelector onSelect={joinGame} />
        <ColorSelector onSelect={chooseColor} players={context.players} colors={colors} />
        <p className="startButton">
            <button className="button" disabled={!canStart} onClick={prevent(startGame)}>Démarrer</button>
        </p>
    </div>
}