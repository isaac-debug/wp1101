import './App.css';
import {useState, useRef} from 'react'
import{guess, startGame, restart} from './axios'

function App() {
  // define states
  const [hasWon, setHasWon] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [number, setNumber] = useState();

  const start = ()=>{
    setHasStarted(()=>true)
  }
  const won = ()=>{
    setHasWon(()=>true)
  }
  // define three different views
  const winningMode = 
      <div>
        <h1>You won! the number was xxx</h1>
        <button onClick={async () => {await restart()}}>restart</button>
      </div>
  const gameMode = 
        <div>
          <h1>Guess a number between 1 to 100</h1>
          <div className = 'input-bar'>
            <input  onChange= {e=>{setNumber(()=>e.target.value)}}></input>
            <button onClick={async () => {
              alert(number)
              await guess(number)              
              }}>Guess!</button>
          </div>
        </div>
  const game = 
    <div>
      {hasWon ?
      winningMode : gameMode}
    </div>
  
  const startMenu = 
        <div>
          <button onClick={async () => {
            //await startGame()
            start()}}>
            start game 
          </button>
        </div>
  return (
    <div className='App'>
      {hasStarted ? game : startMenu}
    </div>
  );
}

export default App;
