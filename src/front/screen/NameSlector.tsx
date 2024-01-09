import { FormEvent, useState } from "react"

type NameSelectorProps = {
    onSelect: (name: string) => void
}

export function NameSelector ({onSelect}: NameSelectorProps) {
    const [error, setError] = useState('')
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const name = new FormData(e.currentTarget as HTMLFormElement).get('name')

        if (!name || name.toString().trim() === '') {
            setError('Vous devez choisir un pseud')
            return;
        }

        onSelect(name.toString())
    }

    return <>
        <h1>Sélectionner un pseudo</h1>
        {error && <div className="alert">
            {error}
            <button onClick={() => setError('')} className="alert_close">&times;</button>
        </div>}
        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="name">Votre pseudo</label>
            <input type="text" id="name" name="name" required />

            <button>Choisir</button>
        </form>
    </>
}