import "./App.css";

function Star({status, onReset}) {
  if(status === "win" || status === "lose"){
    return (
      <button onClick={() => onReset()}>
        New Game
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
