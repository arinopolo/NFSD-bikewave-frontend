import { useContext, useEffect, useState } from "react";
import LogoComponent from "../components/LogoComponent";
import ListItem from "../containers/ListItem";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "../containers/bottomNavigation/BottomNavigation";

const ListItemPage = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();


  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);
  return (
  
    <div>
      <LogoComponent />
      <ListItem  />
    </div>
 
   
  );
};

export default ListItemPage;
