import React from "react";
import "./Category.css";

const CategoryComponent = ({ onClick, text, image, className }) => {
  const combinedClassName = `category ${className}`;
  return (
    <div onClick={onClick} className={combinedClassName}>
      <div>{image}</div>
      <p>{text}</p>
    </div>
  );
};

export default CategoryComponent;
