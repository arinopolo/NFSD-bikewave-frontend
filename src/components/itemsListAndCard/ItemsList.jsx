import React, { useEffect, useState } from "react";
import "../../styles/ItemsList.css";
import ItemCard from "./ItemCard";

const ErrorMessage = () => {
  return <div className="error">No se han encontrado bicicletas</div>;
};

const ItemsList = ({ bicyclesList, refresh, toggleRefresh }) => {
  return (
    <>
      {bicyclesList.length > 0 ? (
        <div className="items-container">
          {bicyclesList.map((bicycle) => (
            <ItemCard
              key={bicycle._id}
              bicycle={bicycle}
              refresh={refresh}
              toggleRefresh={toggleRefresh}
              
            />
          ))}
        </div>
      ) : (
        <ErrorMessage />
      )}
    </>
  );
};

export default ItemsList;
