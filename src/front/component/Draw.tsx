import { prevent } from "../../func/dom";

type DrawProps = {
    onRestart?: () => void
}

export function Draw ({ onRestart }: DrawProps) {
    return <div className="flex" style={{justifyContent: 'space-between'}}>
        <h2 className="flex" style={{gap: '.5rem'}}>
            Dommage : c'est une égalité
        </h2>
        <button className="button" style={{marginLeft: '10px'}} onClick={prevent(onRestart)}>
            Rejouer
        </button>
    </div>
}