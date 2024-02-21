import React from "react";

const CitySearch = ({ setInputValue, inputValue }) => {
  return (
    <input
      type="text"
      className="search-input"
      placeholder="Ciudad"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
};

export default CitySearch;
