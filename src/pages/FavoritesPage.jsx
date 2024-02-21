import LogoComponent from "../components/LogoComponent";
import ItemsList from "../components/itemsListAndCard/ItemsList";
import { useEffect, useState } from "react";
import api from "../api/api";

const FavoritesPage = () => {
  const [bicyclesList, setBicyclesList] = useState([]);

  const getFavoritesList = async () => {
    try {
      const backendResponse = await api.getFavoritesList();
      if (backendResponse) {
        setBicyclesList(backendResponse);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    getFavoritesList();
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
