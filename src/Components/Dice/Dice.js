import React from "react";

class Dice extends React.Component {
  state = { roll: null };
  rollNum = () => {
    let random = (Math.random() * 6 + 1) | 0;
    this.setState({ roll: random });
    return random;
  };

  componentDidMount = () => {
    this.props.getRollFunc(this.rollNum);
  };
  render() {
    return (
      <div>
        {this.state.roll && (
          <img src={`./images/dice-${this.state.roll}.png`} alt="die img" />
        )}
      </div>
    );
  }
}

export default Dice;
