import React, { useState } from "react";
import Setting from "../../components/setting/Setting";
import Button from "../../components/button/Button";
import "./Settings.css";
import PersonalData from "../../components/personalData/PersonalData";

const Settings = ({ handleLogoutClick, userInfo, toggleRefresh, refresh }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePesonalDataClick = () => {
    console.log("click on setting");
    console.log(userInfo);
    setModalVisible(true);
  };
  return (
    <>
      <div className="settings-container flex flex-column gap-2 align-start">
        <Setting
          text={"Editar datos personales"}
          onClick={() => handlePesonalDataClick()}
        
        />

        {modalVisible && (
          <PersonalData
            userInfo={userInfo}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            toggleRefresh={toggleRefresh}
            refresh={refresh}
          />
        )}

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
