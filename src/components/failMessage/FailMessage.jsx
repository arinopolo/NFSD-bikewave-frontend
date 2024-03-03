import React from "react";
import Button from "../button/Button";

const FailMessage = ({ text, onClick }) => {
  return (
    <div className="flex flex-column gap-1 m-1">
      <h4 className="error">{text}</h4>
      <Button text="Continuar" onClick={onClick} />
    </div>
  );
};

export default FailMessage;
