import React, { useState, useEffect } from "react";
import "./App.css";

function Timer({ start, state}) {
    const [time, setTime] = useState(10);
  
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
      }
  
      return () => clearInterval(intervalId);
    }, [start, time]);
    
    if(state === "win"){
        return <p className="timer">¡Felicitaciones, ha ganado el juego! 🎉</p>;
    }
    else if (start && time !== 0) {
      return <p className="timer">Tiempo restante: {time}</p>;
    } else if (!start) {
      return null;
    }else {
      return <p className="timer">Ha perdido el juego 😢</p>;
    }
  }

export default Timer;
