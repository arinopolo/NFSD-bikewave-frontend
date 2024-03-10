import React, { useState } from "react";
import Button from "../button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const ChangePassword = ({
  userInfo,
  setModalPasswordVisible,
  modalPasswordVisible,
  toggleRefresh,
  refresh,
}) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(false);

  const changePassword = async (oldPassword, newPassword) => {
    try {
      const token = localStorage.getItem("token");

      const backendResponse = await fetch(`${BASE_URL}/users/change-password`, {
        method: "PUT",
        body: JSON.stringify({ oldPassword, newPassword }),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const data = await backendResponse.json();
      return data;
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleSubmit = () => {
    changePassword(oldPassword, newPassword);
  };
  return (
    <>
      <div className="personal-data-container ">
        <div className="flex-row-space-between">
          <p>Cambia tu contraseña</p>
          <FontAwesomeIcon
            icon={faCircleXmark}
            size="lg"
            className="close-modal-btn"
            onClick={() => setModalPasswordVisible(!modalPasswordVisible)}
          />
        </div>
        <p className="bold">Escribe tu contraseña actual: </p>

        <input
          type="text"
          name="oldPassword"
          id="oldPassword"
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <p className="bold">Escribe tu nueva contraseña: </p>
        <input
          type="text"
          name="oldPassword"
          id="oldPassword"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button
          text="Guardar"
          className="submit-input"
          onClick={() => handleSubmit()}
        />
      </div>
    </>
  );
};

export default ChangePassword;
