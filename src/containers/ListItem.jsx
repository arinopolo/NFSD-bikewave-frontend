import React from "react";
import ListItemForm from "../components/ListItemForm";

const ListItem = () => {
  return (
    <div className="list-item-container">
      <div>
        <h1 className="big-title">
          ¡Comparte tu pasión por el ciclismo y gana dinero extra alquilando tu
          bicicleta!
        </h1>
      </div>
      <ListItemForm />
    </div>
  );
};

export default ListItem;
