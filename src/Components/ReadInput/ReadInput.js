import React from "react";

class ReadInput extends React.Component {
  state = { errorMsg: "" };

  onSubmit = (event) => {
    event.preventDefault();
    let inputEl = event.target.firstChild;
    console.log(Number(inputEl.value));
    if (Number(inputEl.value)) {
      let val = Number(inputEl.value);
      if (val < 20) {
        this.setState({
          errorMsg: `Score goal must be at least 20! Entered: ${inputEl.value}`,
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
      <form onSubmit={(e) => this.onSubmit(e)}>
        <input type="text" />
        <button type="submit">Start</button>
        <div>{this.state.errorMsg}</div>
      </form>
    );
  }
}

export default ReadInput;
