import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginAndRegisterPage from "./pages/LoginAndRegisterPage";
import ListItemPage from "./pages/ListItemPage";
import HomePage from "./pages/HomePage";
import BottomNavigation from "./containers/bottomNavigation/BottomNavigation";
import ItemPage from "./pages/ItemPage";
import FavoritesPage from "./pages/FavoritesPage";
import ProfilePage from "./pages/ProfilePage";
import ChatPage from "./pages/ChatPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import WelcomePage from "./pages/WelcomePage";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <>
          <Routes>
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/login" element={<LoginAndRegisterPage />} />
            <Route path="/list-item" element={<ListItemPage />} />
            <Route path="/products/:bikeid" element={<ItemPage />} />
            <Route path="/chats" element={<ChatPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/reset-password/:singleToken"
              element={<ResetPasswordPage />}
            />
          </Routes>
        </>
        <BottomNavigation />
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
