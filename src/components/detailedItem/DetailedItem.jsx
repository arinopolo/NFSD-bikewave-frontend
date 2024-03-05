import React, { useState } from "react";
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
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SuccessMessage from "../../components/successMessage/SuccessMessage";
import FailMessage from "../../components/failMessage/FailMessage";
import Loading from "../../components/loading/Loading";

const DetailedItem = ({ bicycle }) => {
  const userId = localStorage.getItem("userId");

  const [successBooking, setSuccessBooking] = useState(false);
  const [bookingTried, setBookingTried] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const handleBookClick = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
    setLoading(true);
    try {
      const backendResponse = await api.bookBicycle(
        bicycle._id,
        bicycle.owner._id
      );
      const receiver = {
        receiverId: bicycle.owner._id,
      };
      const createChatResponse = await api.createChat(receiver);

      setBookingTried(true);

      if (backendResponse.success && createChatResponse.success || createChatResponse.existing ) {
        setSuccessBooking(true);
      }
    } catch (error) {
      console.log("Error:", error);
      setSuccessBooking(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex w-100 h-100 flex-column gap-2 align-center justify-start">
      {loading ? (
        <Loading />
      ) : (
        <>
          {" "}
          {bookingTried && !loading ? (
            successBooking ? (
              <SuccessMessage
                onClick={() => navigate("/")}
                text={
                  "Felicidades! Tu bicicleta ha sido reservada con éxito. Te hemos enviado un email de confirmación con los detalles del pedido. ¡Prepárate para disfrutar de un paseo emocionante! "
                }
              />
            ) : (
              <FailMessage text={"no reservado"} />
            )
          ) : (
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
                <p className="bicycle-description">{bicycle.description}</p>

                <div className="flex gap-05">
                  {" "}
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    size="lg"
                    style={{ color: "#31b15c" }}
                  />
                  <h3 className="capitalize">{bicycle.location}</h3>{" "}
                </div>

                <h4 className="owner-name">
                  Propietario: {bicycle.owner.firstName}{" "}
                  {bicycle.owner.secondName}
                </h4>
                <div className="flex gap-1 w-100">
                  <Button
                    text={"Contactar"}
                    onClick={handleContactClick}
                    className={"secondary-btn  w-50"}
                  />
                  <Button
                    text={"Reservar"}
                    className={"w-50"}
                    onClick={() => handleBookClick()}
                  />
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
          )}
        </>
      )}
    </div>
  );
};

export default DetailedItem;
