import "./App.css";

function Tile({ number, status, onClick, gameStatus }) {
  const handleClick = (param) => {
    onClick(param);
  };
  const className = status !== "" ? "numberButton-" + status : "numberButton-default";
  return (
    <button className={className} onClick={() => handleClick(number)} disabled={gameStatus !== "playing" ? true: false}>
      {number}
    </button>
  );
}

export default Tile;
