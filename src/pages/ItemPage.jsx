import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LogoComponent from "../components/LogoComponent";
import DetailedItem from "../components/detailedItem/DetailedItem";
import api from "../api/api";
import Button from "../components/button/Button";
import Loading from "../components/loading/Loading";



const ItemPage = () => {
  const navigate = useNavigate();
  const [bicycle, setBicycle] = useState();
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    if (bicycle) {
      setLoading(false);

    }
  }, [bicycle]);

  return (
    <div className="mb-15">
      <LogoComponent />
      {loading ? (
        <Loading />
      ) : (
        <div>
          {" "}
          <DetailedItem bicycle={bicycle} />
          {bicycle.owner._id === userId ? (
            <Button text="Eliminar " onClick={handleDeleteBicycle} />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default ItemPage;
