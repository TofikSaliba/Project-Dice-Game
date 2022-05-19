import React from "react";

class Player extends React.Component {
  render() {
    return (
      <div>
        <div className="totalScore">{this.props.totalScore}</div>
        <div className="currentScore">
          {this.props.turn ? this.props.currentScore : 0}
        </div>
      </div>
    );
  }
}

export default Player;
