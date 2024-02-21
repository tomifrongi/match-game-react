import React, { useState } from "react";
import "./App.css";
import Tile from "./Tile.js";
import Timer from "./Timer.js";

function App() {
  const [numbers, setNumbers] = useState([
    { number: 1, status: "" },
    { number: 2, status: "" },
    { number: 3, status: "" },
    { number: 4, status: "" },
    { number: 5, status: "" },
    { number: 6, status: "" },
    { number: 7, status: "" },
    { number: 8, status: "" },
    { number: 9, status: "" },
  ]);

  
  const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  let starsOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let starNumber = 0;

  function getAvailableStars() {
    const randomIndex = getRandomNumber(0, starsOptions.length - 1);
    const selectedStars = starsOptions[randomIndex];
    starNumber = selectedStars;
    return Array.from({ length: selectedStars }, (_, i) => i + 1);
  }

  const renderStars = getAvailableStars();

  const [clicked, setClicked] = useState(false);

  const handleClickButton = (number: number) => {
    const updatedNumbers = numbers.map((item) => {
      if (item.number === number) {
        if (item.status === "selected") {
          return { ...item, status: "" };
        }
        return { ...item, status: "selected" };
      }
      return item;
    });
    setNumbers(updatedNumbers);
  };

  const enableTimer = true;
  const gameState = "playing";

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
                  {renderStars.map((star) => (
                    <span className="starIcon" key={star} aria-label="star">
                      ⭐
                    </span>
                  ))}
                </div>
              </td>
              <td>
                <div className="gridCustom">
                  {numbers.map((number) => (
                    <Tile
                      key={number.number}
                      number={number.number}
                      status={number.status}
                      onClick={handleClickButton}
                    ></Tile>
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
