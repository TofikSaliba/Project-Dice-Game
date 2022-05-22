import "./Player.css";

const Player = (props) => {
  const currentPlayer = props.turn ? " current" : "";

  return (
    <div className={`playerContainer${currentPlayer}`}>
      <h1>{props.playerName}</h1>
      <div className="wins">wins: {props.wins}</div>
      <div className="totalScore">total score: {props.totalScore}</div>
      <div className="currentScore">
        Current score: {props.turn ? props.currentScore : 0}
      </div>
    </div>
  );
};

export default Player;
