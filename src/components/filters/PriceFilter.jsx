import React, { useEffect, useState } from "react";
import "../../styles/FilterModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import ReactSlider from "react-slider";

const MIN = 0;
const MAX = 300;

const FilterModal = ({
  setModalVisible,
  modalVisible,
  setMinPrice,
  setMaxPrice,
}) => {
  const [values, setValues] = useState([MIN, MAX]);

  const filterBikesByPrice = (values) => {
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
    setModalVisible(!modalVisible);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[id === "min" ? 0 : 1] =
        value === "0" ? "" : parseInt(value, 10) || MIN;
      return updatedValues;
    });
  };

  return (
    <div className="price-filter-modal flex flex-column ">
      <div className="flex-row-space-between">
        <h2>Rango de precios</h2>
        <FontAwesomeIcon
          icon={faCircleXmark}
          size="lg"
          className="close-modal-btn"
          onClick={() => setModalVisible(!modalVisible)}
        />
      </div>
      <div className="flex flex-column align-center justify-center my-5">
        <div className="padding ">
          <p>Precios por noche con comisiones e impuestos incluidos</p>
          <div className="flex-row-center">
            <div className="price-container">
              <p>min</p>
              <input
                className="price-tag"
                type="number"
                id="min"
                value={values[0]}
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
                value={values[1]}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <ReactSlider
            className="slider"
            min={MIN}
            max={MAX}
            value={values}
            onChange={(value) => setValues(value)}
          />
        </div>
        <button
          className="submit filter-btn"
          onClick={() => filterBikesByPrice(values)}
        >
          Filtrar
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
