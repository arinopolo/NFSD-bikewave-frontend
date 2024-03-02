import React from "react";
import ItemCard from "../itemsListAndCard/ItemCard";
import "./MyBicycles.css";
import Button from "../button/Button";

const MyBicycles = ({ myBicyclesList, onClick }) => {
  return (
    <>
      {myBicyclesList && (
        <div className="flex flex-column gap-1 align-center">
          <h2>Mis bicicletas</h2>
          <div className="my-bikes">
            {myBicyclesList.map((bicycle) => (
              <>
                <ItemCard key={bicycle._id} bicycle={bicycle} />
              </>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MyBicycles;
