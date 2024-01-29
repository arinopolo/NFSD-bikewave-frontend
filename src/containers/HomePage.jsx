import BottomNavigation from "../components/BottomNavigation";
import LogoComponent from "../components/LogoComponent";
import Categories from "../components/Categories";
import ItemComponent from "../components/ItemComponent";
import ItemsList from "../components/ItemsList";
import { useState } from "react";
import SearchFilterComponent from "../components/SearchFilterComponent";
import FilterModal from "../components/FilterModal";

const HomePage = () => {
  const [filteredByCategories, setFilteredByCategories] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <LogoComponent />
      <SearchFilterComponent
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
      {modalVisible && (
        <FilterModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        />
      )}
      <Categories setFilteredByCategories={setFilteredByCategories} />

      <ItemsList filteredByCategories={filteredByCategories} />
      <BottomNavigation />
    </>
  );
};

export default HomePage;
