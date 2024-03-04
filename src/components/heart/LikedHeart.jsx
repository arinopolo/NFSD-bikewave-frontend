import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const LikedHeart = ({ onClick }) => {
  return (
    <>
      <div onClick={onClick}>
        <FontAwesomeIcon
          icon={faHeart}
          size="2xl"
          style={{
            color: "#31b15c",
            position: "absolute",
            top: "0.2rem",
            right: "0.2rem",
          }}
        />
      </div>
    </>
  );
};

export default LikedHeart;
