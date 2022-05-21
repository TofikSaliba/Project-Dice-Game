import React from "react";
import "./Dice.css";
const IMAGES = {
  1: require("../../assets/images/dice-1.png"),
  2: require("../../assets/images/dice-2.png"),
  3: require("../../assets/images/dice-3.png"),
  4: require("../../assets/images/dice-4.png"),
  5: require("../../assets/images/dice-5.png"),
  6: require("../../assets/images/dice-6.png"),
};

class Dice extends React.Component {
  state = { roll: 6 };

  rollNum = () => {
    let random1 = (Math.random() * 6 + 1) | 0;
    let intID = setInterval(() => {
      let random = (Math.random() * 6 + 1) | 0;
      this.setState({ roll: random });
    }, 100);
    setTimeout(() => {
      this.setState({ roll: random1 });
      clearInterval(intID);
    }, 920);
    return random1;
  };

  componentDidMount = () => {
    this.props.getRollFunc(this.rollNum);
  };

  render() {
    const rolling = this.props.rolling ? "animate" : "";
    return (
      <>
        {this.state.roll && (
          <img
            src={IMAGES[this.state.roll]}
            alt="die img"
            className={rolling}
          />
        )}
      </>
    );
  }
}

export default Dice;
