import React from "react";
import Button from "../button/Button";
import "./SuccessMessage.css";

const SuccessMessage = ({ text, onClick }) => {
  return (
    <div className="flex flex-column gap-1 m-1 success-message align-center">
      <h3>{text}</h3>
      <Button text="Continuar" onClick={onClick} />
    </div>
  );
};

export default SuccessMessage;
