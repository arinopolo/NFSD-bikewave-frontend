import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LogoComponent from "../components/LogoComponent";
import DetailedItem from "../components/detailedItem/DetailedItem";
import api from "../api/api";
import Button from "../components/button/Button";

const Loading = () => {
  return <div> Loading</div>;
};

const ItemPage = () => {
  const navigate = useNavigate();
  const [bicycle, setBicycle] = useState();
  let { bikeid } = useParams();

  const userId = localStorage.getItem("userId");

  const getBicycleInfo = async () => {
    try {
      const backendResponse = await api.getBicycleInfo(bikeid);
      if (backendResponse) {
        setBicycle(backendResponse);
        console.log(backendResponse);
        console.log("user id", userId);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const handleDeleteBicycle = async () => {
    try {
      const backendResponse = await api.deleteBicycle(bicycle);

      if (backendResponse) {
        navigate("/");
      }
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
      {bicycle.owner._id === userId ? (
        <Button text="Eliminar " onClick={handleDeleteBicycle} />
      ) : null}
    </div>
  );
};

export default ItemPage;
