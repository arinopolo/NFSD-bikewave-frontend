import React, { useEffect, useState } from "react";
import api from "../api/api";
import ItemComponent from "./ItemComponent";
import "../styles/ItemsList.css";

const ItemsList = ({ filteredByCategories }) => {
  const [bicyclesList, setBicyclesList] = useState([]);
  const getBicyclesListFromBack = async () => {
    try {
      const list = await api.getBicyclesList();
      if (list) {
        // Establecer registrationSuccessful solo si la respuesta es exitosa
        setBicyclesList(list);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    getBicyclesListFromBack();
  }, []);

  useEffect(() => {
    // Este efecto se ejecutará cada vez que filteredByCategories cambie
    // Puedes agregar lógica adicional según tus necesidades
    console.log("Lista filtrada ha cambiado:", filteredByCategories);
  }, [filteredByCategories]);
  return (
    <div className="items-container">
      {filteredByCategories && filteredByCategories.length > 0
        ? filteredByCategories.map((bicycle) => {
            return <ItemComponent key={bicycle.id} bicycle={bicycle} />;
          })
        : bicyclesList.map((bicycle) => {
            return <ItemComponent key={bicycle.id} bicycle={bicycle} />;
          })}
    </div>
  );
};

export default ItemsList;
