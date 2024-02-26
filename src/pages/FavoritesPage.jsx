import LogoComponent from "../components/LogoComponent";
import ItemsList from "../components/itemsListAndCard/ItemsList";
import { useEffect, useState } from "react";
import api from "../api/api";
import ItemCard from "../components/itemsListAndCard/ItemCard";

const FavoritesPage = () => {
  const [bicyclesList, setBicyclesList] = useState([]);
  const [refresh, toggleRefresh] = useState(false);

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
  }, [refresh]);

  console.log("my bicycle list", bicyclesList);
  return (
    <>
      <LogoComponent />
      <h1>Aqui tienes tus bicicletas favoritas!</h1>
      <ItemsList
        bicyclesList={bicyclesList}
        favoritesList={bicyclesList}
        refresh={refresh}
        toggleRefresh={toggleRefresh}
      />
    </>
  );
};

export default FavoritesPage;
