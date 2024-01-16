import { Draw } from "../component/Draw";
import { useGame } from "../hooks/useGame";


type DrawScreenProps = {
    // ...
}

// eslint-disable-next-line no-empty-pattern
export function DrawScreen ({}: DrawScreenProps) {
    const {send} = useGame();
    const restart = () => send({ type: 'restart' });
    return <div>
         <Draw onRestart={restart} />
    </div>
}