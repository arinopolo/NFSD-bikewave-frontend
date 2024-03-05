import React from "react";
import "./BigPhoto.css";

const BigPhoto = ({ photo }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${photo})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        position: "relative",
        width: "100%",
        height: "80vh",
      }}
    ></div>
  );
};

export default BigPhoto;
