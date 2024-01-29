import React from "react";
import "../styles/ItemComponent.css";

const ItemComponent = ({ bicycle }) => {
  return (
    <div key={bicycle._id} className="item-container">
      <div src="" alt="" className="item-pic"></div>
      <div className="item-info-container">
        <div>
          <h2 className="item-name">{bicycle.brand}</h2>
          <h3>{bicycle.model}</h3>
          <h3>{bicycle.rating}</h3>
        </div>
        <div className="price-location">
          <h2>{bicycle.price} €/día </h2>
          <p>{bicycle.location}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemComponent;
