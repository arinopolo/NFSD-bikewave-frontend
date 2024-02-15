import React, { useRef, useState } from "react";
import "../styles/Categories.css";
import CategoryComponent from "../components/filters/CategoryComponent";
import {
  AllIcon,
  CityIcon,
  RoadIcon,
  MountainIcon,
  GravelIcon,
  ElectricIcon,
  ProIcon,
} from "../assets/SVGIcons";

const CategoriesFilter = ({ setCategory, category }) => {
  const [isActive, setIsActive] = useState("all");

  const handleCategoryClick = (category) => {
    setIsActive(category);
    setCategory(category);
    console.log("categoria", category);
  };

  const handleActiveCategory = (category) => {
    return `${isActive === category ? "active" : "not-active"}`;
  };
  return (
    <>
      <div className="categories">
        <CategoryComponent
          onClick={() => {
            handleCategoryClick(null);
          }}
          className={handleActiveCategory("all")}
          text={"Todas"}
          image={<AllIcon />}
        />
        <CategoryComponent
          onClick={() => {
            handleCategoryClick("city");
          }}
          className={handleActiveCategory("city")}
          text={"Ciudad"}
          image={<CityIcon />}
        />
        <CategoryComponent
          onClick={() => {
            handleCategoryClick("road");
          }}
          className={handleActiveCategory("road")}
          text={"Carretera"}
          image={<RoadIcon />}
        />

        <CategoryComponent
          onClick={() => {
            handleCategoryClick("mountain");
          }}
          className={handleActiveCategory("mountain")}
          text={"Montaña"}
          image={<MountainIcon />}
        />
        <CategoryComponent
          onClick={() => {
            handleCategoryClick("gravel");
          }}
          className={handleActiveCategory("gravel")}
          text={"Gravel"}
          image={<GravelIcon />}
        />
        <CategoryComponent
          onClick={() => {
            handleCategoryClick("electric");
          }}
          className={handleActiveCategory("electric")}
          text={"Eléctrica"}
          image={<ElectricIcon />}
        />
        <CategoryComponent
          onClick={() => {
            handleCategoryClick("competition");
          }}
          className={handleActiveCategory("competition")}
          text={"Competición"}
          image={<ProIcon />}
        />
      </div>
    </>
  );
};

export default CategoriesFilter;
