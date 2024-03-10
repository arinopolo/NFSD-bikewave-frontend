import LogoComponent from "../components/logo/LogoComponent";
import ItemsList from "../components/itemsListAndCard/ItemsList";
import { useEffect, useState } from "react";
import api from "../api/api";
import Button from "../components/button/Button";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading/Loading";
import BottomNavigation from "../containers/bottomNavigation/BottomNavigation";

const LoginToContinue = () => {
  const navigate = useNavigate();

  const handleLoginNavigate = () => {
    navigate("/login");
  };
  return (
    <>
      <div>Parece que no has iniciado sesión </div>
      <Button onClick={handleLoginNavigate} text={"Iniciar sesión"} />
    </>
  );
};

const FavoritesPage = () => {
  const token = localStorage.getItem("token");
  const [bicyclesList, setBicyclesList] = useState([]);
  const [refresh, toggleRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  const getFavoritesList = async () => {
    try {
      const backendResponse = await api.getFavoritesList();
      if (backendResponse) {
        setBicyclesList(backendResponse);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFavoritesList();
  }, [refresh, token]);

  return (
    <>
      <LogoComponent />
      <h1>¡Aquí tienes tus bicicletas favoritas!</h1>

      {loading ? (
        <Loading />
      ) : (
        <>
          {" "}
          {!token ? (
            <LoginToContinue />
          ) : (
            <ItemsList
              bicyclesList={bicyclesList}
              favoritesList={bicyclesList}
              refresh={refresh}
              toggleRefresh={toggleRefresh}
            />
          )}
        </>
      )}
    </>
  );
};

export default FavoritesPage;
