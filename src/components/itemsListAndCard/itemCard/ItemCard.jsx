import React, { useState } from "react";
import "./ItemCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";
import LikedHeart from "../../heart/LikedHeart";
import NotLikedHeart from "../../heart/NotLikedHeart";
import { Link } from "react-router-dom";
import api from "../../../api/api";

const ItemCard = ({ bicycle, refresh, toggleRefresh, isFavorite }) => {
  const handleClickLike = async (bicycleId, e) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      const backendResponse = await api.addAndDeleterFavorits(bicycleId);
      console.log(backendResponse);
      toggleRefresh(!refresh);
    } catch (error) {
      console.error("Listing error:", error.message);
    }
  };
  return (
    <>
      <Link to={`/products/${bicycle._id}`}>
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
          >
            <div>
              {isFavorite ? (
                <LikedHeart onClick={(e) => handleClickLike(bicycle._id, e)} />
              ) : (
                <NotLikedHeart
                  onClick={(e) => handleClickLike(bicycle._id, e)}
                />
              )}
            </div>
          </div>

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
        </div>
      </Link>
    </>
  );
};

export default ItemCard;
