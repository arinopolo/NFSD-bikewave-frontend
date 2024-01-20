import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./containers/HomePage";
import ListItemPage from "./containers/ListItemPage";
import LoginAndRegisterPage from "./containers/LoginAndRegisterPage";
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState(null);

  const updateToken = (token) => {
    window.localStorage.setItem("token", token);
    setToken(token);
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    setToken(token);
  }, []);
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <LoginAndRegisterPage setToken={updateToken} token={token} />
            }
          />
          <Route path="/list-item" element={<ListItemPage token={token} />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
