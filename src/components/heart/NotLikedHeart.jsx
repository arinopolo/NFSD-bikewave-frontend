import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const NotLikedHeart = ({ onClick }) => {
  return (
    <div onClick={onClick}>
      <FontAwesomeIcon
        icon={faHeart}
        size="xl"
        style={{
          color: "#31b15c",
          position: "absolute",
          top: "0.2rem",
          right: "0.2rem",
        }}
      />
    </div>
  );
};

export default NotLikedHeart;
