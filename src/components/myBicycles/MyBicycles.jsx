import React from "react";
import ItemCard from "../itemsListAndCard/itemCard/ItemCard";
import "./MyBicycles.css";

const MyBicycles = ({ myBicyclesList }) => {
  return (
    <>
      {myBicyclesList && (
        <div className="flex flex-column gap-1 align-start mybicycle-container">
          <h2>Mis bicicletas:</h2>
          <div className="my-bikes">
            {myBicyclesList.map((bicycle) => (
              <ItemCard key={bicycle._id} bicycle={bicycle} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MyBicycles;
