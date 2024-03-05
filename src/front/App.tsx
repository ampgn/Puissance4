import { useState } from "react"

import { currentPlayer } from "../func/game"
import { GameStates } from "../types"
import { Grid } from "./component/Grid"
import { useGame } from "./hooks/useGame"
import { LobbyScreen } from "./screens/LobbyScreen"
import { PlayScreen } from "./screens/PlayScreen"
import { VictoryScreen } from "./screens/VictoryScreen"
import { DrawScreen } from "./screens/DrawScreen"

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };
  
  const {state, context, send} = useGame()
  const canDrop = state === GameStates.PLAY
  const player = canDrop ? currentPlayer(context) : undefined
  const dropToken = canDrop ? (x: number) => {
    send({ type: 'dropToken', x: x});
  } : undefined

  return (
    <div>
      {!gameStarted && (
        <div className="start-page">
          <h1>Bienvenue dans le jeu de Puissance 4</h1>
          <button className="start-button" onClick={handleStartGame}>Commencer le jeu</button>
        </div>
      )}
      {gameStarted && (
        <div className="containerStyle">
          <div className='container'>
            {state === GameStates.LOBBY && <LobbyScreen />}
            {state === GameStates.PLAY && <PlayScreen />}
            {state === GameStates.VICTORY && <VictoryScreen />}
            {state === GameStates.DRAW && <DrawScreen />}
            <Grid winingPositions={context.winingPositions} grid={context.grid} onDrop={dropToken} color={player?.color} />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
