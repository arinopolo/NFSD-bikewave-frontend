import React, { useState } from "react";
import ProfileButton from "../../components/profileButton/ProfileButton";
import "./ProfileButtons.css";

const ProfileButtons = ({ setIsActive, isActive }) => {
  const handleClick = (text) => {
    setIsActive(text);

  };
  const activeClass = (buttonText) => {
    return isActive === buttonText ? "active" : "not-active";
  };
  return (
    <div className="profile-buttons">
      <ProfileButton
        text={"Sobre mí"}
        onClick={() => handleClick("Sobre mí")}
        className={activeClass("Sobre mí")}
      />
      <ProfileButton
        text={"Configuración"}
        onClick={() => handleClick("Configuración")}
        className={activeClass("Configuración")}
      />
    </div>
  );
};

export default ProfileButtons;
