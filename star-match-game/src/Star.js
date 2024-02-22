import React, { useState, useEffect } from "react";
import "./App.css";

function Star({status}) {
  if (status === "lost") {
    return (
      <span className="starIcon" aria-label="star">
        ⭐
      </span>
    );
  }else if(status === "win"){
    return (
      <button>
        Volver a jugar
      </button>
    );
  } else {
    return (
      <span className="starIcon" aria-label="star">
        ⭐
      </span>
    );
  }
}

export default Star;
