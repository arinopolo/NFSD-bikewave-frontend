import LogoComponent from "../components/LogoComponent";
import Categories from "../components/filters/CategoryComponent";
import ItemsList from "../components/itemsListAndCard/ItemsList";
import { useEffect, useState } from "react";
import SearchFilterComponent from "../containers/SearchAndFilter";
import FilterModal from "../components/filters/PriceFilter";
import CategoriesFilter from "../containers/CategoriesFilter";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const HomePage = () => {
  const [bicyclesList, setBicyclesList] = useState([]);
  const [favorite, setFavorite] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [location, setLocation] = useState("");

  console.log(favorite);

  const getBicyclesList = async () => {
    try {
      const categoryParam = category ? `category=${category}&` : "";
      const minPriceParam = `minPrice=${minPrice}&`;
      const maxPriceParam = `maxPrice=${maxPrice}&`;
      const locationParam = location ? `location=${location}&` : "";

      const backendResponse = await fetch(
        `${BASE_URL}/bicycles/?${categoryParam}${minPriceParam}${maxPriceParam}${locationParam}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await backendResponse.json();

      if (data) {
        setBicyclesList(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const addToFavorite = async (favoriteId) => {
    try {
      const token = localStorage.getItem("token");
      console.log(favoriteId);
      const addProduct = await fetch(
        `${BASE_URL}/users/favorites/${favoriteId}`,
        {
          method: "POST",
          headers: {
            Authorization: token,
          },
        }
      );

      const data = await addProduct.json();
      return data;
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
      <ItemsList bicyclesList={bicyclesList} setFavorite={setFavorite} />
    </>
  );
};

export default HomePage;
