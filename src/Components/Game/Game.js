import React from "react";
import Dice from "../Dice/Dice";
import CustomBtn from "../CustomBtn/CustomBtn";
import Player from "../Player/Player";
import ReadInput from "../ReadInput/ReadInput";

class Game extends React.Component {
  state = {
    currentDiceRoll: [],
    playerTurn: false,
    playerTurnCurrentScore: 0,
    totalScore1: 0,
    totalScore2: 0,
    p1Wins: 0,
    p2Wins: 0,
    isRollBtnDisabled: true,
    isGameOver: false,
    resetGame: true,
    winnerMsg: "",
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
    this.setState({ isRollBtnDisabled: true });
    const currentDiceRoll = [];
    this.state.rollFuncs.forEach((diceFunc, idx) => {
      currentDiceRoll[idx] = diceFunc();
    });
    this.setState({ currentDiceRoll: currentDiceRoll });

    setTimeout(() => {
      this.setState({ isRollBtnDisabled: false });
      this.updateCurrentSum();
    }, 1000);
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
    this.checkGameOver(whoToAddTo);
  };

  checkGameOver = (playerScoreKey) => {
    setTimeout(() => {
      let playerNum;
      if (this.state[playerScoreKey] === this.state.scoreGoal) {
        playerNum = playerScoreKey.slice(-1);
        this.setState({
          winnerMsg: `player ${playerNum} has won! with reaching exactly ${this.state.scoreGoal} points.`,
        });
      } else if (this.state[playerScoreKey] > this.state.scoreGoal) {
        playerNum = playerScoreKey === "totalScore1" ? "2" : "1";
        this.setState({
          winnerMsg: `player ${playerNum} has won! by the other player elimination getting over a ${this.state.scoreGoal}`,
        });
      }
      if (playerNum) {
        this.setState((prev) => {
          console.log(prev[`p${playerNum}Wins`]);
          return {
            isGameOver: true,
            [`p${playerNum}Wins`]: prev[`p${playerNum}Wins`] + 1,
          };
        });
      }
    }, 100);
  };

  playAgain = () => {
    this.setState({
      currentDiceRoll: [],
      playerTurn: false,
      playerTurnCurrentScore: 0,
      totalScore1: 0,
      totalScore2: 0,
      isRollBtnDisabled: false,
      isGameOver: false,
      winnerMsg: "",
    });
  };

  getScoreGoalAndStart = (scoreGoal) => {
    this.playAgain();
    this.setState({
      scoreGoal: scoreGoal,
      p1Wins: 0,
      p2Wins: 0,
      resetGame: false,
    });
  };

  newGame = () => {
    this.setState({
      resetGame: true,
      isRollBtnDisabled: true,
    });
  };

  render() {
    return (
      <div>
        <CustomBtn
          text="New Game"
          callBackFunc={this.newGame}
          disabled={false}
        />
        <Player
          playerName="player1"
          currentScore={this.state.playerTurnCurrentScore}
          totalScore={this.state.totalScore1}
          turn={!this.state.playerTurn}
          wins={this.state.p1Wins}
        />
        <Player
          playerName="player2"
          currentScore={this.state.playerTurnCurrentScore}
          totalScore={this.state.totalScore2}
          turn={this.state.playerTurn}
          wins={this.state.p2Wins}
        />
        <Dice
          getRollFunc={this.getRollFunc}
          rolling={this.state.isRollBtnDisabled}
        />
        <Dice
          getRollFunc={this.getRollFunc}
          rolling={this.state.isRollBtnDisabled}
        />
        <CustomBtn
          text="Roll The Dice"
          callBackFunc={this.rollAllDice}
          disabled={this.state.isRollBtnDisabled}
        />
        <CustomBtn
          text="Hold"
          callBackFunc={this.holdTheScoreAndChangeTurn}
          disabled={false}
        />
        {this.state.resetGame && (
          <ReadInput getScoreGoal={this.getScoreGoalAndStart} />
        )}
        {this.state.isGameOver && (
          <div className="gameOverPop">
            <p>{this.state.winnerMsg}</p>
            <CustomBtn
              text="Play Again"
              callBackFunc={this.playAgain}
              disabled={false}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Game;
