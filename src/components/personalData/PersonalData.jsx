import React, { useEffect, useState } from "react";
import "./PersonalData.css";
import Button from "../button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import api from "../../api/api";

const PersonalData = ({
  userInfo,
  modalDataVisible,
  setModalDataVisible,
  toggleRefresh,
  refresh,
}) => {
  const [editingMode, setEditingMode] = useState("");
  const [firstName, setFirstName] = useState(userInfo.firstName);
  const [secondName, setSecondName] = useState(userInfo.secondName);
  const [email, setEmail] = useState(userInfo.email);

  const handleSubmit = async () => {
    const newValue = { firstName, secondName, email };
    try {
      const backendResponse = await api.changePersonalInfo(userInfo, newValue);
      if (backendResponse) {
        toggleRefresh(!refresh);
        setEditingMode("");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleEditing = (input) => {
    setEditingMode(input);
  };

  return (
    <>
      <div className="personal-data-container ">
        <div className="flex-row-space-between">
          <h2>Pincha en el campo para cambiarlo </h2>
          <FontAwesomeIcon
            icon={faCircleXmark}
            size="lg"
            className="close-modal-btn"
            onClick={() => setModalDataVisible(!modalDataVisible)}
          />
        </div>
        <p>Tu nombre:</p>

        {editingMode === "firstName" ? (
          <div className="flex flex-row">
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Button
              text="Guardar"
              className="submit-input"
              onClick={() => handleSubmit(firstName)}
            />
          </div>
        ) : (
          <p onClick={() => handleEditing("firstName")}>{userInfo.firstName}</p>
        )}

        <p>Tu apellido:</p>

        {editingMode === "secondName" ? (
          <div className="flex flex-row">
            <input
              type="text"
              name="secondName"
              id="secondName"
              value={secondName}
              onChange={(e) => setSecondName(e.target.value)}
            />
            <Button
              text="Guardar"
              className="submit-input"
              onClick={() => handleSubmit(secondName)}
            />
          </div>
        ) : (
          <p onClick={() => handleEditing("secondName")}>
            {userInfo.secondName}
          </p>
        )}

        <p>Tu correo electrónico:</p>

        {editingMode === "email" ? (
          <div className="flex flex-row">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              text="Guardar"
              className="submit-input"
              onClick={() => handleSubmit(email)}
            />
          </div>
        ) : (
          <p onClick={() => handleEditing("email")}>{userInfo.email}</p>
        )}
      </div>
    </>
  );
};

export default PersonalData;
