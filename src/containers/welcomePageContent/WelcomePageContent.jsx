import React from "react";
import "./WelcomePageContent.css";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";

const WelcomePageContent = () => {
  const navigate = useNavigate();
  return (
    <div className="welcome-container flex flex-column  gap-1">
      <div>

        <h1 className="welcome-title">HOLA</h1>
        <h4 className="welcome-message">
          Bienvendid@ a tu nueva comunidad ciclista.
 
          ¿Tienes una bicicleta que no usas?,¿preparando tu primer triatlón y no
          puedes comprar una bici? ¡Alquílala! Aquí encontrarás una bicicleta
          para todos tus planes en un solo click, tanto de propietarios
          personales como de pequeños negocios.
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
