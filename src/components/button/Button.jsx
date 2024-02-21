import React from "react";
import "./Button.css";

const Button = ({ text, onClick, className }) => {
  return (
    <button onClick={onClick} className={className}>
      {text}
    </button>
  );
};

export default Button;
