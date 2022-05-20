import React from "react";
import "./Dice.css";
import dice1 from "../../assets/images/dice-1.png";
import dice2 from "../../assets/images/dice-2.png";
import dice3 from "../../assets/images/dice-3.png";
import dice4 from "../../assets/images/dice-4.png";
import dice5 from "../../assets/images/dice-5.png";
import dice6 from "../../assets/images/dice-6.png";

class Dice extends React.Component {
  state = { roll: null };
  images = ["", dice1, dice2, dice3, dice4, dice5, dice6];

  rollNum = () => {
    let random = (Math.random() * 6 + 1) | 0;
    this.setState({ roll: random });
    return random;
  };

  componentDidMount = () => {
    this.props.getRollFunc(this.rollNum);
  };

  render() {
    const rolling = this.props.rolling ? "animate" : "";
    return (
      <div>
        {this.state.roll && (
          <img
            src={this.images[this.state.roll]}
            alt="die img"
            className={rolling}
          />
        )}
      </div>
    );
  }
}

export default Dice;
