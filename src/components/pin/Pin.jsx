import React from "react";
import bike from "../../assets/bike.svg";

const Pin = ({ onClick }) => {
  return (
    <div>
      <img src={bike} onClick={onClick} />
    </div>
  );
};

export default Pin;
