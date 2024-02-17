import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const LikedHeart = () => {
  return (
    <>
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
    </>
  );
};

export default LikedHeart;
