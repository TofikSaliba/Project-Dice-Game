import React from "react";

class CustomBtn extends React.Component {
  render() {
    return (
      <div>
        <button onClick={() => this.props.rollDiceFunc()}>Roll The Dice</button>
      </div>
    );
  }
}

export default CustomBtn;
