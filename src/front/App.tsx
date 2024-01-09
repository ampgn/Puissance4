import { PlayerColor } from "../types"
import { ColorSelector } from "./screen/ColorSelector"
import { NameSelector } from "./screen/NameSlector"

function App() {
  
  return (
   <div className='container'>
     <NameSelector disabled onSelect={() => null}/>
     <hr />
     <ColorSelector onSelect={() => null} players={[
        {
          id: '1',
          name: 'Jonh',
          color: PlayerColor.RED
        }, 
        { 
          id: '2',
          name: 'Marc',
          color: PlayerColor.YELLOW
        }
      ]} colors={[PlayerColor.RED, PlayerColor.YELLOW]}/>
      <hr />
   </div>
  )
}

export default App
