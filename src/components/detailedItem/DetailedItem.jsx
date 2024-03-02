import React from "react";
import BigPhoto from "../photos/bigPhoto/BigPhoto";
import "./DetailedItem.css";
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
import { useNavigate } from "react-router-dom";
import api from "../../api/api";



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

  const navigate = useNavigate();

  const handleContactClick = async () => {
    const receiver = {
      receiverId: bicycle.owner._id,
    };
    try {
      const backendResponse = await api.createChat(receiver);
      if (backendResponse) {
        navigate("/chats");
      }
    } catch (error) {
      console.log("Error:", error);
    }
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
          <h3> Ubicación: {bicycle.location}</h3>
          <h2 className="title">{bicycle.price}€/día</h2>
          <h4>
            Propietario: {bicycle.owner.firstName} {bicycle.owner.secondName}
          </h4>
          <div className="flex gap-1">
            <Button text={"Contactar"} onClick={handleContactClick} />
            <Button text={"Reservar"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailedItem;
