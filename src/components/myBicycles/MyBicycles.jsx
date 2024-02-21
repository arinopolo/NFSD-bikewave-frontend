import React from "react";
import ItemCard from "../itemsListAndCard/ItemCard";
import "./MyBicycles.css";

const ErrorMessage = () => {
  return <div className="error">No se han encontrado bicicletas</div>;
};

const MyBicycles = ({ myBicyclesList }) => {
  return (
    <>
      <div>
        <h2>Mis bicicletas</h2>
      </div>
      {myBicyclesList.length > 0 ? (
        <div className="my-bikes">
          {myBicyclesList.map((bicycle) => (
            <ItemCard key={bicycle._id} bicycle={bicycle} />
          ))}
        </div>
      ) : (
        <ErrorMessage />
      )}
    </>
  );
};

export default MyBicycles;
