import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const NotLikedHeart = () => {
  return (
    <FontAwesomeIcon
      icon={faHeart}
      size="2xl"
      style={{
        color: "#31b15c",
        position: "absolute",
        top: "0.2rem",
        right: "0.2rem",
        zIndex: "1",
      }}
    />
  );
};

export default NotLikedHeart;
