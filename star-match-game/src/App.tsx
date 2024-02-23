import React, { useEffect, useState } from "react";
import "./App.css";
import Tile from "./Tile.js";
import Star from "./Star.js";
import Timer from "./Timer.js";

function App() {

  // Number buttons for game board
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

  // Generate random number between min and max
  const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // Generate posible sums for stars based on available numbers
  const generatePosibleSums = () => {
    const availableNumbers = numbers.filter((num) => num.status === "");
    const posibleSums = [];

    for (let i = 0; i < availableNumbers.length; i++) {
      posibleSums.push(availableNumbers[i].number);
    }

    for (let i = 0; i < availableNumbers.length - 1; i++) {
      for (let j = i + 1; j < availableNumbers.length; j++) {
        const sum =
          availableNumbers[i].number + availableNumbers[j].number;
        if (sum !== 0) {
          posibleSums.push(sum);
        }
      }
    }
    return posibleSums;
  };

  // States for refresh stars, star number, game state, timer management and partial sum for selected buttons
  const [starRefresh, setStarRefresh] = useState(false);
  const [starNumber, setStarNumber] = useState(0);
  const [gameState, setGameState] = useState("playing");
  const [enableTimer, setEnableTimer] = useState(false);
  const [partialSum, setPartialSum] = useState(0);

  // Variable to store the array of stars to render
  let renderStars = Array.from({ length: starNumber }, (_, i) => i + 1);

  // Generate rendered stars array based on the star number, only affected by starRefresh change
  useEffect(() => {
    const starsOptions = generatePosibleSums();
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

  // Check if the partial sum is equal to the star number, if it is, 
  // set the selected numbers to checked and refresh the stars
  useEffect(() => {
    if (partialSum === starNumber) {
      setPartialSum(0);
      const updatedNumbers = numbers.map((item) => {
        if (item.status === "selected" || item.status === "wrong") {
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


  // Handle click on number buttons, if the timer is not enabled, enable it
  const handleClickButton = (number: number) => {
    if (!enableTimer) {
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

  // Handle time out, set game state to lose, disable timer and set star number to 1
  const onTimeOut = () => {
    setGameState("lose");
    setEnableTimer(false);
    setStarNumber(1);
  }

  // Reset the game, set numbers to initial state, set game state to playing, set partial sum to 0 and refresh stars
  const resetTimer = () => {
    console.log("resetTimer")
    setNumbers([
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
    setGameState("playing");
    setPartialSum(0);
    setStarRefresh(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        <table>
          <thead>
            <tr>
              <th colSpan={2}>
                <p>
                  Choose any number combination that adds up to the number of
                  stars displayed
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className = {gameState !== "playing" ? "" : "gridCustom"}>
                  {renderStars.map((star) => (
                    <Star key={star} status={gameState} onReset={resetTimer}/>
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
                      gameStatus={gameState}
                    ></Tile>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>
                <Timer start={enableTimer} state={gameState} onTimeOut={onTimeOut} />
              </td>
            </tr>
          </tfoot>
        </table>
      </header>
    </div>
  );
}

export default App;
