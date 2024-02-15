import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LogoComponent from "../components/LogoComponent";
import BigPhoto from "../components/photos/bigPhoto/BigPhoto";
import DetailedItem from "../containers/detailedItem/DetailedItem";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Loading = () => {
  return <div> Loading</div>;
};

const ItemPage = () => {
  const [bicycle, setBicycle] = useState();
  let { userid } = useParams();
  const getBicycleInfo = async () => {
    try {
      const backendResponse = await fetch(`${BASE_URL}/bicycles/${userid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await backendResponse.json();
      if (data) {
        setBicycle(data);
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
