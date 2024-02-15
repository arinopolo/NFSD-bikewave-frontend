import LogoComponent from "../components/LogoComponent";
import ItemsList from "../components/itemsListAndCard/ItemsList";
import { useContext, useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const FavoritesPage = () => {
  const [bicyclesList, setBicyclesList] = useState([]);

  const getBicyclesList = async () => {
    try {
      const token = localStorage.getItem("token");
      const backendResponse = await fetch(`${BASE_URL}/users/favorites`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const data = await backendResponse.json();
      console.log("my data", data);
      if (data) {
        setBicyclesList(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    getBicyclesList();
  }, []);

  console.log("my bicycle list", bicyclesList);
  return (
    <>
      <LogoComponent />
      <h1>Aqui tienes tus bicicletas favoritas!</h1>
      <ItemsList bicyclesList={bicyclesList} />
    </>
  );
};

export default FavoritesPage;
