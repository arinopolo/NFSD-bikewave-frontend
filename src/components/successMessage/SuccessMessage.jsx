import React from "react";
import Button from "../button/Button";

const SuccessMessage = ({ text, onClick }) => {
  return (
    <div className="flex flex-column gap-1 m-1">
      <h4>{text}</h4>
      <Button text="Continuar" onClick={onClick} />
    </div>
  );
};

export default SuccessMessage;
