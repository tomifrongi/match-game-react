import React, { useState, useEffect } from "react";
import "./App.css";

function Timer({ start, state, onTimeOut}) {
    const [time, setTime] = useState(10);
    if(time === 0 && state === "playing" && start === false){
        setTime(10);
    }
    useEffect(() => {
      let intervalId;
  
      if (start && time > 0) {
        intervalId = setInterval(() => {
          setTime((time) => {
            if (time === 1) {
              clearInterval(intervalId);
              return 0;
            } else {
              return time - 1;
            }
          });
        }, 1000);
      } else if (!start) {
        clearInterval(intervalId);
      } else if(state === "win"){
        clearInterval(intervalId);
      }
      else if (time === 0) {
        clearInterval(intervalId);
        onTimeOut();
      }
      return () => clearInterval(intervalId);
    }, [start, time]);
    
    if(state === "win"){
        return <p className="timer">Congratulations, You have won! 🎉</p>;
    }
    else if (start && time !== 0) {
      return <p className="timer">Remaining time: {time}</p>;
    } else if (state === "lose") {
      return <p className="timer">You have lost the game 😢</p>;
    }else {
      return null;
    }
  }

export default Timer;
