import React from "react";
import CustomBtn from "../CustomBtn/CustomBtn";
import "./Popup.css";

class Popup extends React.Component {
  render() {
    console.log(this.props.winnerMsg);
    return (
      <div className="gameOverPop">
        <p>{this.props.winnerMsg}</p>
        <CustomBtn
          text="Play Again"
          callBackFunc={this.props.playAgain}
          disabled={false}
        />
      </div>
    );
  }
}

export default Popup;
