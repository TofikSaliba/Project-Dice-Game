import React from "react";
import Dice from "../Dice/Dice";
import CustomBtn from "../CustomBtn/CustomBtn";

class Game extends React.Component {
  state = {
    currentDiceRoll: [],
    whosTurn: true, //* in component: App
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
  };

  // getRollFunc = (func) => {
  //   //* this.setState =>>>> CurrentDiceRoll
  //   this.updateCurrentSum(this.state.currentDiceRoll);
  // };

  updateCurrentSum = (currentDiceRoll) => {
    //! check if double sixes, call resetPlayerTurnCurrentScore
    //* this.setState for total playerTurnCurrentScore
  };

  resetPlayerTurnCurrentScore = () => {};

  updateTotalScoreFromCurrent = () => {
    //* this.setState totalScore of the current player += playerTurnCurrentScore
  };

  render() {
    console.log(this.state.currentDiceRoll);
    return (
      <div>
        {/* <NewGameBtn /> */}
        {/* <Player
          name="player1"
          currentScore={playerTurnCurrentScore}
          totalScore={state}
          turn={!this.state.whosTurn}
        /> */}
        {/* <Player
          name="player2"
          currentScore={playerTurnCurrentScore}
          totalScore={state}
          turn={this.state.whosTurn}
        /> */}
        <Dice getRollFunc={this.getRollFunc} />
        <Dice getRollFunc={this.getRollFunc} />
        <CustomBtn rollDiceFunc={this.rollAllDice} />
        {/* <RollBtn callback={this.randomize} /> */}
        {/* <HoldBtn callball={this.updateTotalScoreFromCurrent} /> */}
      </div>
    );
  }
}

export default Game;
