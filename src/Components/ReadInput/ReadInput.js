import React from "react";
import "./ReadInput.css";

class ReadInput extends React.Component {
  state = { errorMsg: "" };

  onSubmit = (event) => {
    event.preventDefault();
    let inputEl = event.target.firstChild;
    if (Number(inputEl.value)) {
      let val = Number(inputEl.value);
      if (val < 20 || val > 1000) {
        this.setState({
          errorMsg: `Score goal must be between 20 and 1000, Entered: ${inputEl.value}`,
        });
      } else {
        this.props.getScoreGoal(val);
      }
    } else {
      this.setState({ errorMsg: `${inputEl.value} is not a number!` });
    }
    inputEl.value = "";
  };
  render() {
    return (
      <>
        <form onSubmit={(e) => this.onSubmit(e)}>
          <input type="text" />
          <button type="submit">Start</button>
        </form>
        <div className="errorMsg">{this.state.errorMsg}</div>
      </>
    );
  }
}

export default ReadInput;
