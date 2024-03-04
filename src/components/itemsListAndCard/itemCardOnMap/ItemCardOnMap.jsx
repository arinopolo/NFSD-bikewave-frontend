import React from "react";
import "./ItemCardOnMap.css";
import { Link } from "react-router-dom";
import LikedHeart from "../../heart/LikedHeart";
import NotLikedHeart from "../../heart/NotLikedHeart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";

const ItemCardOnMap = ({ bicycle, refresh, togggleRefresh, isFavorite }) => {
  return (
    <>
      <Link to={`/products/${bicycle._id}`}>
        <div key={bicycle._id} className="item-container-map">
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
            <div className="flex flex-column align-start">
              <div className="flex flex-column align-start">
                <h2 className="item-name">{bicycle.brand}</h2>
                <h4>{bicycle.model}</h4>
              </div>
              <h4>{bicycle.category}</h4>
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
              <div className="flex gap-05 align-center">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  size="2xl"
                  style={{ color: "#31b15c" }}
                />
                <h3 className="capitalize">{bicycle.location}</h3>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ItemCardOnMap;
