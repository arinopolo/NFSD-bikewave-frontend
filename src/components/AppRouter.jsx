import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginAndRegisterPage from "../containers/LoginAndRegisterPage";
import ListItemPage from "../containers/ListItemPage";
import HomePage from "../containers/HomePage";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginAndRegisterPage />} />
            <Route path="/list-item" element={<ListItemPage />} />
          </Routes>
        </>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
