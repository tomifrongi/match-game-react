import React, { useState, useEffect } from "react";
import "./App.css";

function Tile({ number, status, onClick }) {
  const handleClick = (param) => {

    onClick(param);
  };
  const className = status !== "" ? "numberButton-" + status : "numberButton-default";
  return (
    <button className={className} onClick={() => handleClick(number)}>
      {number}
    </button>
  );
}

export default Tile;
