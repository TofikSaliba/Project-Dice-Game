import React from "react";

class CustomBtn extends React.Component {
  render() {
    return (
      <div>
        <button onClick={() => this.props.rollDiceFunc()}>
          {this.props.text}
        </button>
      </div>
    );
  }
}

export default CustomBtn;
