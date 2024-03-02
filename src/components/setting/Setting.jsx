import React from "react";
import "./Setting.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Setting = ({ text, onClick }) => {
  return (
    <div className="flex justify-between w-100" onClick={onClick}>
      <h3 className="setting-text">{text}</h3>
      <FontAwesomeIcon
        icon={faChevronRight}
        size="lg"
        style={{ color: "#31b15c" }}
      />
    </div>
  );
};

export default Setting;
