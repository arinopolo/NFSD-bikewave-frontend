import React from "react";
import "./MapSwitcher.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MapSwitcher = ({ text, icon, onClick }) => {
  return (
    <button className="map-switcher flex gap-05" onClick={onClick}>
      {text}
      <div>
        <FontAwesomeIcon icon={icon} />
      </div>
    </button>
  );
};

export default MapSwitcher;
