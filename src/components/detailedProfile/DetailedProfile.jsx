import React, { useContext } from "react";
import "./DetailedProfile.css";
import Button from "../button/Button";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const DetailedProfile = ({ userInfo }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logout();
    navigate("/login");
  };
  return (
    <>
      <div className="profile-container">
        <div className="avatar-container">
          <p>{userInfo.firstName[0]}</p>
          <p>{userInfo.secondName[0]}</p>
        </div>
        <h1>
          {userInfo.firstName}
          {userInfo.secondName}
        </h1>
        <p>
          ¡Hola a todos! Soy {userInfo.firstName} y acabo de unirme a{" "}
          <span className="bold"> Bikewave.</span>
          ¡Estoy emocionad@ por montar y alquilar bicicletas geniales!{" "}
          {userInfo.firstName}
        </p>
      </div>
      <Button text={"Cerrar sesion"} onClick={() => handleLogoutClick()}  className="btn-close-session"/>
    </>
  );
};

export default DetailedProfile;
