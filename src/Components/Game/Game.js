import React from "react";
import "./Game.css";
import Dice from "../Dice/Dice";
import CustomBtn from "../CustomBtn/CustomBtn";
import Player from "../Player/Player";
import ReadInput from "../ReadInput/ReadInput";
import NameInput from "../NameInput/NameInput";
import Popup from "../Popup/Popup";
import diceRoll from "../../assets/sound/diceRoll.wav";

class Game extends React.Component {
  state = {
    currentDiceRoll: [],
    playerTurn: false,
    playerTurnCurrentScore: 0,
    player1Name: "Player 1",
    player2Name: "Player 2",
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

  diceRoll = new Audio(diceRoll);

  getRollFunc = (func) => {
    this.setState((prevState) => {
      const roll = [...prevState.rollFuncs];
      roll.push(func);
      return { rollFuncs: roll };
    });
  };

  rollAllDice = () => {
    this.setState({ isRollBtnDisabled: true });
    this.diceRoll.pause();
    this.diceRoll.currentTime = 0;
    this.diceRoll.play();
    const currentDiceRoll = [];
    this.state.rollFuncs.forEach((diceFunc, idx) => {
      currentDiceRoll[idx] = diceFunc();
    });
    this.updateCurrSumAndCurrDiceRoll(currentDiceRoll);
  };

  updateCurrSumAndCurrDiceRoll = (currentDiceRoll) => {
    this.setState({ currentDiceRoll: currentDiceRoll });
    setTimeout(() => {
      this.setState({ isRollBtnDisabled: false });
      this.updateCurrentSum();
    }, 1100);
  };

  updateCurrentSum = () => {
    const dice1 = this.state.currentDiceRoll[0],
      dice2 = this.state.currentDiceRoll[1];
    if (dice1 === 6 && dice2 === 6) {
      this.setState((prev) => {
        return { playerTurnCurrentScore: 0, playerTurn: !prev.playerTurn };
      });
    } else {
      this.addSumToState(dice1 + dice2);
    }
  };

  addSumToState = (diceSum) => {
    this.setState((prev) => {
      let sum = prev.playerTurnCurrentScore + diceSum;
      return {
        playerTurnCurrentScore: sum,
      };
    });
    this.checkIfCurrentIsOverScoreGoal();
  };

  checkIfCurrentIsOverScoreGoal = () => {
    let playerKey = this.state.playerTurn ? "2" : "1";
    this.checkGameOver("playerTurnCurrentScore", playerKey);
  };

  holdTheScoreAndChangeTurn = () => {
    if (this.state.playerTurnCurrentScore === 0) return;
    const whoToAddTo = this.state.playerTurn ? "totalScore2" : "totalScore1";

    this.addCurrentToPlayerTotal(whoToAddTo);
    this.checkGameOver(whoToAddTo, whoToAddTo.slice(-1));
  };

  addCurrentToPlayerTotal = (whoToAddTo) => {
    this.setState((prev) => {
      let sumToAdd = prev[whoToAddTo] + prev.playerTurnCurrentScore;
      return {
        [whoToAddTo]: sumToAdd,
        playerTurn: !prev.playerTurn,
        playerTurnCurrentScore: 0,
      };
    });
  };

  checkGameOver = (stateScoreKey, pNum) => {
    setTimeout(() => {
      let playerNum;
      if (this.state[stateScoreKey] === this.state.scoreGoal) {
        playerNum = pNum;
        this.setReachScoreWinMsg(playerNum);
      } else if (this.state[stateScoreKey] > this.state.scoreGoal) {
        playerNum = this.setPassedScoreWinMsg(pNum);
      }
      if (playerNum) {
        this.gameIsTrulyOverDeclareWinner(playerNum);
      }
    }, 100);
  };

  setReachScoreWinMsg = (playerNum) => {
    let playerName =
      playerNum === "1" ? this.state.player1Name : this.state.player2Name;
    this.setState({
      winnerMsg: `${playerName} has won! with reaching exactly ${this.state.scoreGoal} points.`,
    });
  };

  setPassedScoreWinMsg = (pNum) => {
    let playerNum = pNum === "1" ? "2" : "1";
    let playerName =
      playerNum === "1" ? this.state.player1Name : this.state.player2Name;
    this.setState({
      winnerMsg: `${playerName} has won! by the other player elimination getting over a ${this.state.scoreGoal}`,
    });
    return playerNum;
  };

  gameIsTrulyOverDeclareWinner = (playerNum) => {
    this.setState((prev) => {
      return {
        isGameOver: true,
        [`p${playerNum}Wins`]: prev[`p${playerNum}Wins`] + 1,
      };
    });
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

  getName = (player, value) => {
    let playerName = player === "P1" ? "player1Name" : "player2Name";
    if (value) {
      this.setState({ [playerName]: value });
    } else {
      this.setState({ [playerName]: `Player ${player.slice(-1)}` });
    }
  };

  newGame = () => {
    this.setState({
      resetGame: true,
      isRollBtnDisabled: true,
    });
  };

  render() {
    return (
      <>
        <div className="bg-img"></div>

        <div className="mainContainer">
          <div>
            <Player
              playerName={this.state.player1Name}
              currentScore={this.state.playerTurnCurrentScore}
              totalScore={this.state.totalScore1}
              turn={!this.state.playerTurn}
              wins={this.state.p1Wins}
            />
          </div>
          <div className="gameBoard">
            <div className="newGameBtn">
              <CustomBtn
                text="New Game"
                callBackFunc={this.newGame}
                disabled={this.state.isGameOver}
              />
            </div>
            <div className="diceContainer">
              <Dice
                getRollFunc={this.getRollFunc}
                rolling={this.state.isRollBtnDisabled}
              />
              <Dice
                getRollFunc={this.getRollFunc}
                rolling={this.state.isRollBtnDisabled}
              />
            </div>
            <div className="rollAndHold">
              <CustomBtn
                text="Roll The Dice"
                callBackFunc={this.rollAllDice}
                disabled={this.state.isRollBtnDisabled || this.state.isGameOver}
              />
              <CustomBtn
                text="Hold"
                callBackFunc={this.holdTheScoreAndChangeTurn}
                disabled={false}
              />
            </div>
            <div className="inputContainer">
              {this.state.resetGame && (
                <>
                  <NameInput player="P1" callBack={this.getName} />
                  <NameInput player="P2" callBack={this.getName} />
                  <ReadInput getScoreGoal={this.getScoreGoalAndStart} />
                </>
              )}
              {!this.state.resetGame && (
                <div className="scoreGoal">
                  Score Goal: {this.state.scoreGoal}
                </div>
              )}
            </div>
          </div>
          <div>
            <Player
              playerName={this.state.player2Name}
              currentScore={this.state.playerTurnCurrentScore}
              totalScore={this.state.totalScore2}
              turn={this.state.playerTurn}
              wins={this.state.p2Wins}
            />
          </div>
          {this.state.isGameOver && (
            <Popup
              playAgain={this.playAgain}
              winnerMsg={this.state.winnerMsg}
            />
          )}
        </div>
        <div className="thanks">
          Special thanks to: Shir Toledano productions® for the amazing styling!
        </div>
      </>
    );
  }
}

export default Game;
