import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [numbers, setNumbers] = useState(
    Array.from({ length: 9 }, (_, i) => i + 1)
  );

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
                <div className="gridStar">
                  {starsToShow.map((star) => (
                    <span key={star} role="img" aria-label="star">
                      ⭐
                    </span>
                  ))}
                </div>
              </td>
              <td>
                <div className="gridNumber">
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
            <td colSpan={2}>
              <p>tiempo restante para resolver: {Math.random()}</p>
            </td>
          </tfoot>
        </table>
      </header>
    </div>
  );
}

export default App;
