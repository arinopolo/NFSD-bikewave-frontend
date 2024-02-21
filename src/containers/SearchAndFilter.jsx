import React, { useState } from "react";
import "../styles/SearchFilterComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FilterIcon } from "../assets/SVGIcons";
import FilterIconComponent from "../components/filters/FilterIconComponent";
import CitySearch from "../components/filters/CitySearch";

const SearchFilterComponent = ({
  setModalVisible,
  modalVisible,
  setLocation,
  location,
}) => {
  const [inputValue, setInputValue] = useState("");
  const handleFilterClick = () => {
    setModalVisible(!modalVisible);
  };

  const handleSearchClick = () => {
    setLocation(inputValue);
  };

  return (
    <>
      <div className="flex-row-center filter-search-container">
        <div className="flex-row-center search-input-container">
          <CitySearch setInputValue={setInputValue} inputValue={inputValue} />
          <div className="search-container" onClick={handleSearchClick}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
          </div>
        </div>
        <FilterIconComponent onClick={() => handleFilterClick()} />
      </div>
    </>
  );
};

export default SearchFilterComponent;
