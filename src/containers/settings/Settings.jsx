import React from "react";
import Setting from "../../components/setting/Setting";
import Button from "../../components/button/Button";
import "./Settings.css";

const Settings = ({handleLogoutClick}) => {
  return (
    <>
      <div className="settings-container flex flex-column gap-2 align-start">
        <Setting text={"Editar datos personales"} />
        <Setting text={"Editar contraseña"} />
        <Setting text={"Historial de alquileres"} />
        <Setting text={"Eliminar cuenta"} />
        <Button
          text={"Cerrar sesión"}
          onClick={() => handleLogoutClick()}
          className="btn-close-session"
        />
      </div>
    </>
  );
};

export default Settings;
