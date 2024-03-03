import React from "react";
import "./WelcomePageContent.css";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";

const WelcomePageContent = () => {
  const navigate = useNavigate();
  return (
    <div className="welcome-container flex flex-column  gap-1">
      <div>
        {" "}
        <h1 className="welcome-title">HOLA</h1>
        <h4 className="welcome-message">
          Somos una comunidad ciclista. Alquila bicicletas localmente, tanto de
          propietarios privados como de pequeñas tiendas de segunda mano.
          ¡Reserva tu bicicleta perfecta ahora!"
        </h4>
      </div>
      <Button
        className={"welcome-button"}
        text={"Empezar"}
        onClick={() => navigate("/")}
      />
    </div>
  );
};

export default WelcomePageContent;
