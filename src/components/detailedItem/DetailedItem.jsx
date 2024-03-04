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

const DetailedItem = ({ bicycle, setDeleteBicycle }) => {
  const userId = localStorage.getItem("userId");
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
        navigate(`/chats`);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleDeleteBicycle = async () => {
    try {
      const backendResponse = await api.deleteBicycle(bicycle);

      if (backendResponse) {
        navigate("/");
      }
    } catch (error) {
      console.error("Listing error:", error.message);
    }
  };

  return (
    <>
      <div className="detailed-item-container">
        <BigPhoto photo={bicycle.photo} />
        <div className="details align-start">
          <div className="w-100">
            <div className="flex justify-between">
              <h1 className="title">{bicycle.brand}</h1>
              <h2 className="title">{bicycle.price}€/día</h2>
            </div>
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
          <div className=" flex ">
            <h3> Ubicación: </h3>
            <h3 className="capitalize"> {bicycle.location}</h3>
          </div>

          <h4>
            Propietario: {bicycle.owner.firstName} {bicycle.owner.secondName}
          </h4>
          <div className="flex gap-1 w-100">
            <Button
              text={"Contactar"}
              onClick={handleContactClick}
              className={"secondary-btn "}
            />
            <Button text={"Reservar"} />
          </div>
          {bicycle.owner._id === userId ? (
            <Button
              className={"w-100"}
              text="Eliminar "
              onClick={() => handleDeleteBicycle(bicycle)}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default DetailedItem;
