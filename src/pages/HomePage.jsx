import LogoComponent from "../components/LogoComponent";
import ItemsList from "../components/itemsListAndCard/ItemsList";
import { useEffect, useState } from "react";
import SearchFilterComponent from "../containers/SearchAndFilter";
import FilterModal from "../components/filters/PriceFilter";
import CategoriesFilter from "../containers/categories/Categories";
import api from "../api/api";
import GoogleMapReact from "google-map-react";
import Map from "../components/Map";
import MapSwitcher from "../components/mapSwitcher/MapSwitcher";
import { faList, faMap } from "@fortawesome/free-solid-svg-icons";
import BottomNavigation from "../containers/bottomNavigation/BottomNavigation";

const HomePage = () => {
  const [bicyclesList, setBicyclesList] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [mapView, setMapView] = useState(false);
  const [refresh, toggleRefresh] = useState(false);

  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [location, setLocation] = useState("");

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
      )}
    </>
  );
};

export default HomePage;
