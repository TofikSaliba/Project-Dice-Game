import React from "react";

class CustomBtn extends React.Component {
  render() {
    const classDisabled = this.props.disabled ? "disabled" : "";
    return (
      <div>
        <button
          className={classDisabled}
          onClick={() => this.props.rollDiceFunc()}
          disabled={this.props.disabled}
        >
          {this.props.text}
        </button>
      </div>
    );
  }
}

export default CustomBtn;
