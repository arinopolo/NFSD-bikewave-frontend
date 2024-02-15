import React from "react";
import "./BigPhoto.css";

const BigPhoto = ({ photo }) => {
  return <img className="big-photo" src={photo}></img>;
};

export default BigPhoto;
