import CustomBtn from "../CustomBtn/CustomBtn";
import "./Popup.css";

const Popup = (props) => {
  return (
    <div className="gameOverPop">
      <p>{props.winnerMsg}</p>
      <CustomBtn
        text="Play Again"
        callBackFunc={props.playAgain}
        disabled={false}
      />
    </div>
  );
};

export default Popup;
