import React, { useState } from "react";
import "../../styles/ItemCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";
import LikedHeart from "../heart/LikedHeart";
import NotLikedHeart from "../heart/NotLikedHeart";
import { Link } from "react-router-dom";

const ItemCard = ({ bicycle, setFavorite }) => {
  return (
    <div key={bicycle._id} className="item-container">
      <div
        src=""
        alt=""
        className="item-pic"
        style={{
          backgroundImage: `url(${bicycle.photo})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          position: "relative",
        }}
        onClick={() => setFavorite(bicycle._id)}
      >
        <NotLikedHeart />
      </div>
      <Link to={`/products/${bicycle._id}`}>
        <div className="item-info-container">
          <div>
            <div className="flex-row">
              <h2 className="item-name">
                {bicycle.brand} <span>{bicycle.model}</span>
              </h2>
            </div>
            <h3>{bicycle.category}</h3>
            <h3>
              {bicycle.rating ? bicycle.rating : 0}
              <FontAwesomeIcon
                icon={faStar}
                size="sm"
                style={{ color: "#31b15c" }}
              />
            </h3>
          </div>
          <div className="price-location">
            <h2 className="lowercase">{bicycle.price} €/día </h2>

            <h3>
              {" "}
              <FontAwesomeIcon
                icon={faLocationDot}
                size="sm"
                style={{ color: "#31b15c" }}
              />{" "}
              {bicycle.location}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ItemCard;
