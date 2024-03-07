import { useEffect, useState } from "react"
import gsap from "gsap";

import { currentPlayer } from "../func/game"
import { GameStates } from "../types"
import { Grid } from "./component/Grid"
import { useGame } from "./hooks/useGame"
import { LobbyScreen } from "./screens/LobbyScreen"
import { PlayScreen } from "./screens/PlayScreen"
import { VictoryScreen } from "./screens/VictoryScreen"
import { DrawScreen } from "./screens/DrawScreen"
import { LoginScreen } from "./screens/LoginScreen";
//import { startBackgroundCarousel } from "./backgroundCaroussel"

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  /* const handleQuitGame = () => {
    setGameStarted(false);
  }; */

  useEffect(() => {
    gsap.to('.start-h1', {
      duration: 1.5,
      rotationY: 360
    });
  }, []);
 
  //useEffect(() => {
  //  startBackgroundCarousel(5000); 
  //}, []);
  
  const {state, context, send, playerId} = useGame()
  const canDrop = state === GameStates.PLAY
  const player = canDrop ? currentPlayer(context) : undefined
  const dropToken = canDrop ? (x: number) => {
    send({ type: 'dropToken', x: x});
  } : undefined

  if (!playerId) {
    return <div className='container'>
      <LoginScreen />
    </div>
  }

  return (
    <div className="parent-container">
      {!gameStarted && (
        <div className="start-page">
          <h1 className="start-h1" id="scramble">Bienvenue dans le jeu de Puissance 4</h1>
          <button className="start-button" onClick={handleStartGame}>Commencer une partie</button>
        </div>
      )}
      {gameStarted && (
          <div className="containerStyle">
            <div className='container'>
              PlayerId: {playerId}
              {state === GameStates.LOBBY && <LobbyScreen />}
              {state === GameStates.PLAY && <PlayScreen />}
              {state === GameStates.VICTORY && <VictoryScreen />}
              {state === GameStates.DRAW && <DrawScreen />}
              <div>
                <Grid winingPositions={context.winingPositions} grid={context.grid} onDrop={dropToken} color={player?.color} />
              </div>
            </div>
            {/* <div className="div-quit-button">
              <button className="quit-button" onClick={handleQuitGame}>Quitter la partie</button>
            </div> */}
          </div>
      )}
    </div>
  )
}

export default App
