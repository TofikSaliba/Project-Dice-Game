import React from "react";
import "./NameInput.css";

const NameInput = (props) => {
  const inputChange = (e) => {
    props.callBack(props.player, e.target.value);
  };

  return (
    <>
      <div className="nameContainer">
        <span className="name">{props.player} name: </span>
        <input
          onChange={(e) => inputChange(e)}
          type="text"
          className="inputText2"
        />
      </div>
    </>
  );
};

export default NameInput;
