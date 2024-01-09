import { Player, PlayerColor } from "../../types"

type ColorSelectorProps = {
    onSelect: (color: PlayerColor) => void,
    players: Player[],
    colors: PlayerColor[]
}

function diskColor (color: PlayerColor) {
    return `disc disc-${color === PlayerColor.YELLOW ? 'yellow' : 'red'}`
}

export function ColorSelector ({onSelect, players, colors}: ColorSelectorProps) {
    return <>
        <div className="players">
            {players.map(player => <div className="player" key={player.id}>
                {player.name}
                {player.color && <div 
                        className={diskColor(player.color)}>
                    </div>}
            </div>)}
        </div>
        <h3>Sélectionner une couleur</h3>
        <div className="selector">
            {colors.map(color => <button 
                className={diskColor(color)} 
                key={color} onClick={() => onSelect(color)}>
            </button>)}
        </div>
    </>
}