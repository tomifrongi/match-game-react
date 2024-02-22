import React, { useEffect, useState } from "react";
import "./App.css";
import Tile from "./Tile.js";
import Star from "./Star.js";
import Timer from "./Timer.js";

function App() {
  // number buttons
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

  // Stars functions
  const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const generarPosiblesSumas = () => {
    const numerosDisponibles = numbers.filter((num) => num.status === "");
    const posiblesSumas = [];

    for (let i = 0; i < numerosDisponibles.length; i++) {
      posiblesSumas.push(numerosDisponibles[i].number);
    }

    for (let i = 0; i < numerosDisponibles.length - 1; i++) {
      for (let j = i + 1; j < numerosDisponibles.length; j++) {
        const suma =
          numerosDisponibles[i].number + numerosDisponibles[j].number;
        if (suma !== 0) {
          console.log();
          posiblesSumas.push(suma);
        }
      }
    }
    return posiblesSumas;
  };

  const [starRefresh, setStarRefresh] = useState(false);
  const [starNumber, setStarNumber] = useState(0);
  const [gameState, setGameState] = useState("playing");

  useEffect(() => {
    const starsOptions = generarPosiblesSumas();
    if (starsOptions.length === 0) {
      setStarNumber(1);
      setGameState("win");
      return;
    }
    const randomIndex = getRandomNumber(0, starsOptions.length - 1);
    const selectedStars = starsOptions[randomIndex];
    setStarNumber(selectedStars);
    setStarRefresh(false);
  }, [starRefresh]);

  let renderStars = Array.from({ length: starNumber }, (_, i) => i + 1);

  // timer functions
  let startTimer = false;
  const [enableTimer, setEnableTimer] = useState(false);

  // Game functions
  const [partialSum, setPartialSum] = useState(0);

  useEffect(() => {
    if (partialSum === starNumber) {
      console.log("Ganaste");
      setPartialSum(0);
      const updatedNumbers = numbers.map((item) => {
        if (item.status === "selected") {
          return { ...item, status: "checked" };
        }
        return item;
      });
      setNumbers(updatedNumbers);
      setStarRefresh(true);
    } else if (partialSum > starNumber) {
      const updatedNumbers = numbers.map((item) => {
        if (item.status === "selected") {
          return { ...item, status: "wrong" };
        }
        return item;
      });
      setNumbers(updatedNumbers);
    } else if (partialSum < starNumber) {
      const updatedNumbers = numbers.map((item) => {
        if (item.status === "wrong") {
          return { ...item, status: "selected" };
        }
        return item;
      });
      setNumbers(updatedNumbers);
    }
  }, [partialSum, starNumber]);

  const handleClickButton = (number: number) => {
    if (!startTimer) {
      startTimer = true;
      setEnableTimer(true);
    }
    let partialLocal = partialSum;
    const updatedNumbers = numbers.map((item) => {
      if (item.number === number) {
        if (item.status === "selected" || item.status === "wrong") {
          partialLocal -= number;
          return { ...item, status: "" };
        } else if (item.status === "checked") {
          return item;
        }
        partialLocal += number;
        return { ...item, status: "selected" };
      }
      return item;
    });
    setNumbers(updatedNumbers);
    setPartialSum(partialLocal);
  };

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
                <div className = {gameState !== "playing" ? "" : "gridCustom"}>
                  {renderStars.map((star) => (
                    <Star key={star} status={gameState}/>
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
