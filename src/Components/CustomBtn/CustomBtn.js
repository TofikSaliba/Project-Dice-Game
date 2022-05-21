import React from "react";
import "./CustomBtn.css";

class CustomBtn extends React.Component {
  render() {
    const classDisabled = this.props.disabled ? "disabled" : "";
    return (
      <>
        <button
          className={classDisabled}
          onClick={() => this.props.callBackFunc()}
          disabled={this.props.disabled}
        >
          {this.props.text}
        </button>
      </>
    );
  }
}

export default CustomBtn;
