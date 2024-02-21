import React from "react";
import "./ProfileButton.css";

const ProfileButton = ({ text, className, onClick }) => {
  const combinedClass = `profile-button ${className}`;
  return (
    <div onClick={onClick} className={combinedClass}>
      {text}
    </div>
  );
};

export default ProfileButton;
