import React from "react";
import Dice from "../Dice/Dice";
import CustomBtn from "../CustomBtn/CustomBtn";
import Player from "../Player/Player";

class Game extends React.Component {
  state = {
    currentDiceRoll: [],
    playerTurn: false, //* in component: App
    playerTurnCurrentScore: 0, //* in component: need to decide
    totalScore1: 0,
    totalScore2: 0,
    scoreGoal: 100,
    rollFuncs: [],
  };

  getRollFunc = (func) => {
    this.setState((prevState) => {
      const roll = [...prevState.rollFuncs];
      roll.push(func);
      return { rollFuncs: roll };
    });
  };

  rollAllDice = () => {
    const currentDiceRoll = [];
    this.state.rollFuncs.forEach((diceFunc, idx) => {
      currentDiceRoll[idx] = diceFunc();
    });
    this.setState({ currentDiceRoll: currentDiceRoll });
    setTimeout(() => this.updateCurrentSum(), 0);
  };

  updateCurrentSum = () => {
    const dice1 = this.state.currentDiceRoll[0],
      dice2 = this.state.currentDiceRoll[1];
    if (dice1 === 6 && dice2 === 6) {
      this.setState((prev) => {
        return { playerTurnCurrentScore: 0, playerTurn: !prev.playerTurn };
      });
    } else {
      this.setState((prev) => {
        let sum = prev.playerTurnCurrentScore + dice1 + dice2;
        return {
          playerTurnCurrentScore: sum,
        };
      });
    }
  };

  holdTheScoreAndChangeTurn = () => {
    if (this.state.playerTurnCurrentScore === 0) return;
    const whoToAddTo = this.state.playerTurn ? "totalScore2" : "totalScore1";

    this.setState((prev) => {
      let sumToAdd = prev[whoToAddTo] + prev.playerTurnCurrentScore;
      return {
        [whoToAddTo]: sumToAdd,
        playerTurn: !prev.playerTurn,
        playerTurnCurrentScore: 0,
      };
    });
  };

  updateTotalScoreFromCurrent = () => {
    //* this.setState totalScore of the current player += playerTurnCurrentScore
  };

  componentDidUpdate = () => {
    // console.log("yess");
  };

  render() {
    // console.log(this.state.playerTurn, this.state.currentDiceRoll);
    return (
      <div>
        {/* <NewGameBtn /> */}
        <Player
          playerName="player1"
          currentScore={this.state.playerTurnCurrentScore}
          totalScore={this.state.totalScore1}
          turn={!this.state.playerTurn}
        />
        <Player
          playerName="player2"
          currentScore={this.state.playerTurnCurrentScore}
          totalScore={this.state.totalScore2}
          turn={this.state.playerTurn}
        />
        <Dice getRollFunc={this.getRollFunc} />
        <Dice getRollFunc={this.getRollFunc} />
        <CustomBtn text="Roll The Dice" rollDiceFunc={this.rollAllDice} />
        <CustomBtn text="Hold" rollDiceFunc={this.holdTheScoreAndChangeTurn} />
      </div>
    );
  }
}

export default Game;
