import React, { useState } from "react";
import ListItemForm from "../../components/listItemForm/ListItemForm";
import SuccesMessage from "../../components/successMessage/SuccessMessage";
import FailMessage from "../../components/failMessage/FailMessage";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import "./ListItem.css";

const ListItem = () => {
  const [listingSuccess, setListingSuccess] = useState(false);
  const [listingTried, setListingTried] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="flex flex-column align-center mb-15">
      {listingTried ? (
        loading ? (
          <Loading />
        ) : listingSuccess ? (
          <SuccesMessage
            text={"¡Has subido tu bicicleta con exito!"}
            onClick={() => navigate("/")}
          />
        ) : (
          <FailMessage
            text={"Hubo un error, vuelve a intentarlo!"}
            onClick={() => navigate("list-item")}
          />
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
            loading={loading}
            setLoading={setLoading}
          />
        </>
      )}
    </div>
  );
};

export default ListItem;
