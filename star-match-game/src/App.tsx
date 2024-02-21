import React, { useState } from "react";
import "./App.css";
import Timer from "./Timer.js";

function App() {
  const [numbers, setNumbers] = useState(
    Array.from({ length: 9 }, (_, i) => i + 1)
  );
  
  const enableTimer = true
  const gameState = "playing"
  
  const handleClick = (number: number) => {
    console.log(`Clicked ${number}`);
  };

  let starsOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const randomIndex = getRandomNumber(0, starsOptions.length - 1);
  const selectedStars = starsOptions[randomIndex];

  const starsToShow = Array.from({ length: selectedStars }, (_, i) => i + 1);

  return (
    <div className="App">
      <header className="App-header">
        <table>
          <thead>
            <tr>
              <th colSpan={2}>
                <p>
                  Seleccione una combinacion de numeros que logre la cantidad de
                  estrellas
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="gridCustom">
                  {starsToShow.map((star) => (
                    <span className="starIcon" key={star} aria-label="star">
                      ⭐
                    </span>
                  ))}
                </div>
              </td>
              <td>
                <div className="gridCustom">
                  {numbers.map((number) => (
                    <button
                      key={number}
                      className="numberButton"
                      onClick={() => handleClick(number)}
                    >
                      {number}
                    </button>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>
                <Timer start={enableTimer} state={gameState} />
              </td>
            </tr>
          </tfoot>
        </table>
      </header>
    </div>
  );
}

export default App;
