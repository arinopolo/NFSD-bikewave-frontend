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
      <div className="profile-container flex gap-1 align-center">
        <div>
          <div className="avatar-container">
            <p>{userInfo.firstName[0]}</p>
            <p>{userInfo.secondName[0]}</p>
          </div>
          <div className="flex gap-05 justify-center">
            <h2>{userInfo.firstName}</h2>
            <h2> {userInfo.secondName}</h2>
          </div>
        </div>
        <div className="flex justify-start ">
          <p className="about-me">
            ¡Hola a todos! Soy {userInfo.firstName} y acabo de unirme a
            <span className="bold"> Bikewave.</span>
            ¡Estoy emocionad@ por montar y alquilar bicicletas geniales!
          </p>
        </div>
      </div>
    </>
  );
};

export default DetailedProfile;
