import React from "react";
import { FilterIcon } from "../../assets/SVGIcons";

const FilterIconComponent = ({ onClick }) => {
  return (
    <div className="svg-container" onClick={onClick}>
      <FilterIcon />
    </div>
  );
};

export default FilterIconComponent;
