import React, { useState } from "react";
import "../styles/FilterModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import ReactSlider from "react-slider";

const MIN = 0;
const MAX = 300;

const FilterModal = ({ setModalVisible, modalVisible }) => {
  const [values, setValues] = useState([MIN, MAX]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[id === "min" ? 0 : 1] = parseInt(value, 10) || MIN;
      return updatedValues;
    });
  };
  return (
    <div className="price-filter-modal">
      <div className="flex-row-space-between">
        <h2>Rango de precios</h2>
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="close-modal-btn"
          onClick={() => setModalVisible(!modalVisible)}
        />
      </div>
      <p>Precios por noche con comisiones e impuestos incluidos</p>
      <div className="flex-row-center">
        <div className="price-container">
          <p>min</p>
          <input
            className="price-tag"
            type="number"
            id="min"
            placeholder={values[0]}
            onChange={handleInputChange}
          />
        </div>
        <p>-</p>
        <div className="price-container">
          <p>max</p>
          <input
            className="price-tag"
            type="number"
            id="max"
            placeholder={values[1]}
          />
        </div>
      </div>

      <ReactSlider
        className="slider"
        min={MIN}
        max={MAX}
        value={values}
        onChange={setValues}
      />
      <button className="submit filter-btn">Filtrar</button>
    </div>
  );
};

export default FilterModal;
