import React, { useEffect, useState } from "react";
import "./PersonalData.css";
import Button from "../button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const PersonalData = ({
  userInfo,
  modalVisible,
  setModalVisible,
  toggleRefresh,
  refresh,
}) => {
  const [editingMode, setEditingMode] = useState("");
  const [firstName, setFirstName] = useState(userInfo.firstName);
  const [secondName, setSecondName] = useState(userInfo.secondName);
  const [email, setEmail] = useState(userInfo.email);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const newValue = { firstName, secondName, email };

      const response = await fetch(`${BASE_URL}/users/${userInfo._id}`, {
        method: "PATCH",
        body: JSON.stringify(newValue),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const data = await response.json();
      toggleRefresh(!refresh);
      setEditingMode("");
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
            onClick={() => setModalVisible(!modalVisible)}
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
