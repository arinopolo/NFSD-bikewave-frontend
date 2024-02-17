import LogoComponent from "../components/LogoComponent";
import ItemsList from "../components/itemsListAndCard/ItemsList";
import { useEffect, useState } from "react";
import SearchFilterComponent from "../containers/SearchAndFilter";
import FilterModal from "../components/filters/PriceFilter";
import CategoriesFilter from "../containers/categories/Categories";
import api from "../api/api";

const HomePage = () => {
  const [bicyclesList, setBicyclesList] = useState([]);
  const [favorite, setFavorite] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

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

      if (backendResponse) {
        setBicyclesList(backendResponse);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const addToFavorite = async (favoriteId) => {
    try {
      const backendResponse = await api.addToFavorite(favoriteId);
      console.log(backendResponse);
    } catch (error) {
      console.error("Listing error:", error.message);
    }
  };

  useEffect(() => {
    getBicyclesList();
  }, [category, minPrice, maxPrice, location]);

  useEffect(() => {
    if (favorite) {
      addToFavorite(favorite);
    }
  }, [favorite]);
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
        setFavorite={setFavorite}
        favorite={favorite}
      />
    </>
  );
};

export default HomePage;
