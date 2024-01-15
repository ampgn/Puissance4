import { currentPlayer } from "../func/game"
import { GameStates } from "../types"
import { Grid } from "./component/Grid"
import { useGame } from "./hooks/useGame"
import { LobbyScreen } from "./screens/LobbyScreen"
import { PlayScreen } from "./screens/PlayScreen"


function App() {
  
  const {state, context, send} = useGame()
  const canDrop = state === GameStates.PLAY
  console.log('canDrop', canDrop)
  const player = canDrop ? currentPlayer(context) : undefined
  console.log('player', player)
  const dropToken = canDrop ? (x: number) => {

    send({ type: 'dropToken', x: x})
  } : undefined

  console.log('dropToken', dropToken)

  return (
   <div className='container'>
     {state === GameStates.LOBBY && <LobbyScreen />}
     {state === GameStates.PLAY && <PlayScreen />}
     <Grid grid={context.grid} onDrop={dropToken} color={player?.color} />
   </div>
  )
}

export default App
