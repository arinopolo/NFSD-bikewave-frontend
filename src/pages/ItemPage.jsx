import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LogoComponent from "../components/LogoComponent";
import DetailedItem from "../components/detailedItem/DetailedItem";
import api from "../api/api";
import { AuthContext } from "../contexts/AuthContext";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Loading = () => {
  return <div> Loading</div>;
};

const ItemPage = () => {
  const navigate = useNavigate();
  const [bicycle, setBicycle] = useState();
  let { bikeid } = useParams();
  const { user } = useContext(AuthContext);
  const getBicycleInfo = async () => {
    try {
      const backendResponse = await api.getBicycleInfo(bikeid);
      if (backendResponse) {
        setBicycle(backendResponse);
        console.log("user id", user);
        console.log("bike info", bicycle);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const deleteBicycle = async () => {
    try {
      const token = localStorage.getItem("token");
      const deleteProduct = await fetch(`${BASE_URL}/bicycles/${bicycle._id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });

      navigate("/");
    } catch (error) {
      console.error("Listing error:", error.message);
    }
  };

  useEffect(() => {
    getBicycleInfo();
  }, []);

  if (!bicycle) {
    return <Loading />;
  }

  return (
    <div className="mb-15">
      <LogoComponent />

      <DetailedItem bicycle={bicycle} />
      <button onClick={deleteBicycle}>Eliminar Bicicleta</button>
    </div>
  );
};

export default ItemPage;
