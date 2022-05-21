import React from "react";

class Player extends React.Component {
  render() {
    return (
      <>
        <h1>{this.props.playerName}</h1>
        <div className="wins">wins: {this.props.wins}</div>
        <div className="totalScore">total score: {this.props.totalScore}</div>
        <div className="currentScore">
          Current score: {this.props.turn ? this.props.currentScore : 0}
        </div>
      </>
    );
  }
}

export default Player;
