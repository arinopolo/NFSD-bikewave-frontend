import React from "react";
import BigPhoto from "../photos/bigPhoto/BigPhoto";
import "./DetailedItem.css";
import LikedHeart from "../heart/LikedHeart";
import NotLikedHeart from "../heart/NotLikedHeart";
import {
  CityIcon,
  ElectricIcon,
  GravelIcon,
  MountainIcon,
  ProIcon,
  RoadIcon,
} from "../../assets/SVGIcons";
import CategoryComponent from "../filters/category/Category";
import Button from "../button/Button";

const DetailedItem = ({ bicycle }) => {
  const categoryIcons = {
    mountain: <MountainIcon />,
    road: <RoadIcon />,
    city: <CityIcon />,
    gravel: <GravelIcon />,
    electric: <ElectricIcon />,
    competition: <ProIcon />,
  };

  const categories = {
    mountain: "Montaña",
    road: "Carretera",
    city: "Ciudad",
    gravel: "Gravel",
    electric: "Eléctrico",
    competition: "Competición",
  };
  return (
    <>
      <div className="detailed-item-container">
        <BigPhoto photo={bicycle.photo} />
        <div className="details align-start">
          <div>
            {" "}
            <h1 className="title">{bicycle.brand}</h1>
            <h2>{bicycle.model}</h2>
            <p className="like-text">Añadir a favoritos</p>
          </div>
          <div>
            <CategoryComponent
              text={categories[bicycle.category]}
              image={categoryIcons[bicycle.category]}
            />
          </div>
          <p>{bicycle.description}</p>
          <h2 className="title">{bicycle.price}€/día</h2>
          <Button text={"Reservar"} />
        </div>
      </div>
    </>
  );
};

export default DetailedItem;
