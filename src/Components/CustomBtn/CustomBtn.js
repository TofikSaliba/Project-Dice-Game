import "./CustomBtn.css";

const CustomBtn = (props) => {
  const classDisabled = props.disabled ? "disabled" : "";
  return (
    <>
      <button
        className={classDisabled}
        onClick={() => props.callBackFunc()}
        disabled={props.disabled}
      >
        {props.text}
      </button>
    </>
  );
};

export default CustomBtn;
