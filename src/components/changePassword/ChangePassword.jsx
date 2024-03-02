import React, { useState } from "react";
import Button from "../button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

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
        <p>ecribe tu contrañse actual </p>

        <input
          type="text"
          name="oldPassword"
          id="oldPassword"
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <p>ecribe tu nueva contraseña </p>
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
