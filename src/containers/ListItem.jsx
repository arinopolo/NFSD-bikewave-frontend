import React, { useState } from "react";
import ListItemForm from "../components/listItemForm/ListItemForm";
import ListItemSuccessMessage from "../components/listItemForm/ListItemSuccessMessage";
import ListItemFailMessage from "../components/listItemForm/ListItemFailMessage";

const ListItem = () => {
  const [listingSuccess, setListingSuccess] = useState(false);
  const [listingTried, setListingTried] = useState(false);
  return (
    <div className="flex flex-column align-center mb-15">
      {listingTried ? (
        listingSuccess ? (
          <ListItemSuccessMessage />
        ) : (
          <ListItemFailMessage />
        )
      ) : (
        <>
          <h1 className="big-title">
            ¡Comparte tu pasión por el ciclismo y gana dinero extra alquilando
            tu bicicleta!
          </h1>

          <ListItemForm
            setListingTried={setListingTried}
            setListingSuccess={setListingSuccess}
          />
        </>
      )}
    </div>
  );
};

export default ListItem;
