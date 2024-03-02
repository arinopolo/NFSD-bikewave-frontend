import React, { useState } from "react";
import Setting from "../../components/setting/Setting";
import Button from "../../components/button/Button";
import "./Settings.css";
import PersonalData from "../../components/personalData/PersonalData";
import ChangePassword from "../../components/changePassword/ChangePassword";

const Settings = ({ handleLogoutClick, userInfo, toggleRefresh, refresh }) => {
  const [modalDataVisible, setModalDataVisible] = useState(false);
  const [modalPasswordVisible, setModalPasswordVisible] = useState(false);

  const handlePesonalDataClick = () => {
    setModalDataVisible(true);
  };

  const handleChangePasswordClick = () => {
    setModalPasswordVisible(true);
  };
  return (
    <>
      <div className="settings-container flex flex-column gap-2 align-start">
        <Setting
          text={"Editar datos personales"}
          onClick={() => handlePesonalDataClick()}
        />

        {modalDataVisible && (
          <PersonalData
            userInfo={userInfo}
            modalDataVisible={modalDataVisible}
            setModalDataVisible={setModalDataVisible}
            toggleRefresh={toggleRefresh}
            refresh={refresh}
          />
        )}

        <Setting
          text={"Editar contraseña"}
          onClick={() => handleChangePasswordClick()}
        />

        {modalPasswordVisible && (
          <ChangePassword
            userInfo={userInfo}
            modalPasswordVisible={modalPasswordVisible}
            setModalPasswordVisible={setModalPasswordVisible}
            toggleRefresh={toggleRefresh}
            refresh={refresh}
          />
        )}
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
