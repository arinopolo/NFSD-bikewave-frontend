import React from "react";

const CategoryComponent = ({ onClick, text, image , className }) => {
  return (
    <div onClick={onClick} className={className}>
       <div>{image}</div>
      <p>{text}</p>
     
    </div>
  );
};

export default CategoryComponent;
