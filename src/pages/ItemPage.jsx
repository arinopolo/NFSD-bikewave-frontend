import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LogoComponent from "../components/LogoComponent";
import DetailedItem from "../components/detailedItem/DetailedItem";
import api from "../api/api";

const Loading = () => {
  return <div> Loading</div>;
};

const ItemPage = () => {
  const [bicycle, setBicycle] = useState();
  let { userid } = useParams();
  const getBicycleInfo = async () => {
    try {
      const backendResponse = await api.getBicycleInfo(userid);
      if (backendResponse) {
        setBicycle(backendResponse);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    getBicycleInfo();
  }, []);

  if (!bicycle) {
    return <Loading />;
  }

  return (
    <>
      <LogoComponent />

      <DetailedItem bicycle={bicycle} />
    </>
  );
};

export default ItemPage;
