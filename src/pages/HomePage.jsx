import LogoComponent from "../components/LogoComponent";
import ItemsList from "../components/itemsListAndCard/ItemsList";
import { useEffect, useState } from "react";
import SearchFilterComponent from "../containers/searchAndFilter/SearchAndFilter";
import FilterModal from "../components/filters/priceFilter/PriceFilter";
import CategoriesFilter from "../containers/categories/Categories";
import api from "../api/api";
import Map from "../components/Map";
import MapSwitcher from "../components/mapSwitcher/MapSwitcher";
import { faList, faMap } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading/Loading";

const HomePage = () => {
  const [bicyclesList, setBicyclesList] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [mapView, setMapView] = useState(false);
  const [refresh, toggleRefresh] = useState(false);

  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [location, setLocation] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const visitedBefore = localStorage.getItem("visitedBefore");
    if (!visitedBefore) {
      navigate("/welcome");
    }
  }, []);

  const getBicyclesList = async () => {
    try {
      const backendResponse = await api.getBicyclesList(
        category,
        minPrice,
        maxPrice,
        location
      );

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
    getBicyclesList();
  }, [category, minPrice, maxPrice, location, refresh]);

  const getFavoritesList = async () => {
    try {
      const backendResponse = await api.getFavoritesList();
      if (backendResponse) {
        setFavoritesList(backendResponse);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    getFavoritesList();
  }, [refresh]);

  const handleMapSwitchCLick = () => {
    setMapView(!mapView);
  };
  return (
    <>
      <LogoComponent />
      <SearchFilterComponent
        setModalVisible={setModalVisible}
        setLocation={setLocation}
        location={location}
      />
      {modalVisible && (
        <FilterModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
        />
      )}
      <CategoriesFilter setCategory={setCategory} />
      {loading ? (
        <Loading />
      ) : (
        <>
    
          {!mapView ? (
            <>
              <ItemsList
                bicyclesList={bicyclesList}
                favoritesList={favoritesList}
                refresh={refresh}
                toggleRefresh={toggleRefresh}
              />
              <MapSwitcher
                text={"Mostrar mapa"}
                icon={faMap}
                onClick={handleMapSwitchCLick}
              />
            </>
          ) : (
            <>
              <Map
                bicyclesList={bicyclesList}
                favoritesList={favoritesList}
                refresh={refresh}
                toggleRefresh={toggleRefresh}
              />
              <MapSwitcher
                text={"Mostrar lista"}
                icon={faList}
                onClick={handleMapSwitchCLick}
              />
            </>
          )}{" "}
        </>
      )}
    </>
  );
};

export default HomePage;
