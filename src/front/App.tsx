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

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  useEffect(() => {
    gsap.to('.start-h1', {
      duration: 1.5,
      rotationY: 360
    });
  }, []);
  
  const {state, context, send, playerId, can} = useGame()
  const showGrid = state !== GameStates.LOBBY;
  const dropToken = (x: number) => {
    send({ type: 'dropToken', x: x});
  } 

  if (!playerId && !gameStarted) {
    return (
      <div className="start-page">
        <h1 className="start-h1" id="scramble">Bienvenue dans le jeu de Puissance 4</h1>
        <button className="start-button" onClick={handleStartGame}>Commencer une partie</button>
      </div>
    );
  }

  return (
    <div className="parent-container">
      {(!playerId && gameStarted) && (
        <div className="containerStyle">
          <div className='container'><LoginScreen /></div>
        </div>
      )}
      {playerId && (
        <div className="containerStyle">
          <div className='container'>
            { state === GameStates.LOBBY && <LobbyScreen /> }
            { state === GameStates.PLAY && <PlayScreen /> }
            { state === GameStates.VICTORY && <VictoryScreen /> }
            { state === GameStates.DRAW && <DrawScreen /> }
            <div>
              { showGrid && <Grid 
                winingPositions={context!.winingPositions} 
                grid={context!.grid} 
                onDrop={dropToken} 
                color={currentPlayer(context)?.color} 
                canDrop={(x) => can({ type: 'dropToken', x })} /> }
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
