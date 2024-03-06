import React, { useEffect, useState } from "react";
import "./ItemsList.css";
import ItemCard from "./itemCard/ItemCard";
import FailMessage from "../../components/failMessage/FailMessage";

import { useNavigate } from "react-router-dom";

const ItemsList = ({ bicyclesList, favoritesList, refresh, toggleRefresh }) => {
  const navigate = useNavigate();

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
              isFavorite={
                Array.isArray(favoritesList)
                  ? favoritesList.findIndex(
                      (fav) => fav._id === bicycle._id
                    ) !== -1
                  : false
              }
            />
          ))}
        </div>
      ) : (
        <FailMessage
          text={"No se han encontrado bicicletas"}
          onClick={() => navigate("/")}
        />
      )}
    </>
  );
};

export default ItemsList;
