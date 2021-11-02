/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2021 10 ]
****************************************************************************/

import { size } from 'lodash';
import React, { useState, useRef} from 'react';
import './css/HomePage.css';

{/* -- TODO 2 -- */}
const HomePage = ({startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize /* -- something more... -- */}) => {
    const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.
    const [error, setError] = useState(false);              // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.

    {/* Some functions may be added here! */}
    const numBomb = useRef();
    const numSize = useRef();

    const show_panel = () =>{
      if(showPanel === false)
        setShowPanel((show_panel)=>true);
      else
        setShowPanel((show_panel)=>false);
    }

    return(
      <div className = 'HomeWrapper'>
          <p className = 'title'>MineSweeper</p>
          <button className='btn' onClick={startGameOnClick}>Start Game</button>
            {/* -- TODO 6-2 -- */}
            {/* Useful Hint: <input type = 'range' min = '...' max = '...' defaultValue = '...'> */}
            {/* Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' */}
            {/* Reminder: The defaultValue of 'mineNum' is 10, and the defaultValue of 'boardSize' is 8. */}
          <div className='controlContainer'>
            <button className='btn' onClick={show_panel}>Difficulty Adjustment</button>
            {showPanel &&
              <div className='controlWrapper'>
                { error &&
                  <div className='error'>
                      ERROR: Mine number and board size are invalid!
                  </div>
                }
                <div className='controlPanel'>
                  <div className='controlCol'>
                    <p className='controlTitle'>Mines Number</p>
                    <input ref={numBomb} type='range'  step='1' min='1' max='50' defaultValue='10'></input>
                    <p className='controlNum'>{numBomb.current}</p>
                  </div>
                  <div className='controlCol'>
                    <p className='controlTitle'>Board Size(n×n)</p>
                    <input ref={numSize} type='range' step='1' min='1' max='20' defaultValue='8'></input>
                    <p className='controlNum'>{numSize.current}</p>
                  </div>
                </div>
              </div>
            }
          </div>
          
      </div>
    );

}
export default HomePage;   