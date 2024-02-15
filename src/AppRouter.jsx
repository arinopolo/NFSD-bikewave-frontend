import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginAndRegisterPage from "./pages/LoginAndRegisterPage";
import ListItemPage from "./pages/ListItemPage";
import HomePage from "./pages/HomePage";
import BottomNavigation from "./components/navigation/BottomNavigation";
import ItemPage from "./pages/ItemPage";
import FavoritesPage from "./pages/FavoritesPage";
import ProfilePage from "./pages/ProfilePage";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/login" element={<LoginAndRegisterPage />} />
            <Route path="/list-item" element={<ListItemPage />} />
            <Route path="/products/:userid" element={<ItemPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </>
        <BottomNavigation />
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
