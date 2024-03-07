import { PlayerSession } from "../../types"
import { NameSelector } from "../component/NameSlector"
import { saveSession } from "../func/session";

type LoginScreenProps = {
    // ...
}

// eslint-disable-next-line no-empty-pattern
export function LoginScreen ({}: LoginScreenProps) {
    const handleLogin = async(name: string) => {
        const response: PlayerSession = await fetch('/api/players', { method: 'POST' }).then(r => r.json());
        const player = saveSession({
            ...response,
            name
        })
    }

    return <div>
        <NameSelector onSelect={handleLogin} />
    </div>
}