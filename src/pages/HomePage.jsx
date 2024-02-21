import LogoComponent from "../components/LogoComponent";
import ItemsList from "../components/itemsListAndCard/ItemsList";
import { useEffect, useState } from "react";
import SearchFilterComponent from "../containers/SearchAndFilter";
import FilterModal from "../components/filters/PriceFilter";
import CategoriesFilter from "../containers/categories/Categories";
import api from "../api/api";
import GoogleMapReact from "google-map-react";
import Map from "../components/Map";

const HomePage = () => {
  const [bicyclesList, setBicyclesList] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [refresh, toggleRefresh] = useState(false);

  const [category, setCategory] = useState("");
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
      // if logged in, get favourites
      // once i have the favs... I MERGE THE WITH THE OTHER LIST
      // MAP OVER THE FULL ARRAY OF BICYCLES
      // backendResponse.forEach(bicycle => is included in favourites list?, if so bicycle.isFav: true)
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

  /* useEffect(() => {
    if (favorite) {
      addToFavorite(favorite);
    }
  }, [favorite]);

  */
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
      <CategoriesFilter setCategory={setCategory} category={category} />
      <ItemsList
        bicyclesList={bicyclesList}
        refresh={refresh}
        toggleRefresh={toggleRefresh}
      />

      <Map />
    </>
  );
};

export default HomePage;
