import React from "react";
import "./ReadInput.css";

class ReadInput extends React.Component {
  state = { errorMsg: "" };

  onSubmit = (event) => {
    event.preventDefault();
    let inputEl = event.target.firstChild;
    if (this.checkValidity(inputEl.value)) {
      this.props.getScoreGoal(Number(inputEl.value));
    } else {
    }
    inputEl.value = "";
  };

  checkValidity = (value) => {
    let valToNumber = Number(value);
    if (valToNumber) {
      if (valToNumber < 20 || valToNumber > 1000) {
        this.setState({
          errorMsg: `Score goal must be between 20 and 1000, Entered: ${value}`,
        });
        return false;
      }
    } else {
      this.setState({ errorMsg: `${value} is not a number!` });
      return false;
    }
    return true;
  };

  render() {
    return (
      <>
        <form onSubmit={(e) => this.onSubmit(e)}>
          <input type="text" className="inputText" />
          <button type="submit">Start</button>
        </form>
        <div className="errorMsg">{this.state.errorMsg}</div>
      </>
    );
  }
}

export default ReadInput;
