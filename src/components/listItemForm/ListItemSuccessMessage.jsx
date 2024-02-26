import React from "react";
import { Link } from "react-router-dom";

const ListItemSuccessMessage = () => {
  return (
    <>
      <div>Has subido tu bicicleta con exito!</div>

      <Link to="/">
        {" "}
        <button>Continuar</button>
      </Link>
    </>
  );
};

export default ListItemSuccessMessage;
