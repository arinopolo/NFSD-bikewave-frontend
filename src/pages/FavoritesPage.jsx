import LogoComponent from "../components/LogoComponent";
import ItemsList from "../components/itemsListAndCard/ItemsList";
import { useEffect, useState } from "react";
import api from "../api/api";
import ItemCard from "../components/itemsListAndCard/ItemCard";
import Button from "../components/button/Button";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("token");

const LoginToContinue = () => {
  const navigate = useNavigate();

  const handleLoginNavigate = () => {
    navigate("/login");
  };
  return (
    <>
      <div>Parece que no estas logueado</div>
      <Button onClick={handleLoginNavigate} text={"Loguear"} />
    </>
  );
};

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

      {!token && <LoginToContinue />}
    </>
  );
};

export default FavoritesPage;
