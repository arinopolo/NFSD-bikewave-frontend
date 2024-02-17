import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import "./NavigationItem.css";

const NavigationItem = ({ text, icon, link }) => {
  return (
    <>
      <div className="bottom-nav-btn">
        <Link to={link}>
          <FontAwesomeIcon icon={icon} size="xl" className="icon" />
          <p>{text}</p>
        </Link>
      </div>
    </>
  );
};

export default NavigationItem;
