import { useEffect, useState } from "react";
import BottomNavigation from "../components/BottomNavigation";
import LogoComponent from "../components/LogoComponent";

const HomePage = () => {
  const [bicyclesList, setBicyclesList] = useState([]);
  const getBicyclesList = async () => {
    try {
      const backendResponse = await fetch("http://localhost:3000/bicycles/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!backendResponse.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await backendResponse.json();
      console.log(data);
      setBicyclesList(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    getBicyclesList();
  }, []);
  return (
    <>
      <LogoComponent />
      <h2>Aqui ira el buscador</h2>
      <h2>Aqui iran las cateogias y el filtro</h2>
      {bicyclesList.map((bicycle) => {
        return (
          <>
            <div
              key={bicycle._id}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "2rem",
                border: "1px solid red",
              }}
            >
              {" "}
              <h1>{bicycle.brand}</h1>
              <h3>{bicycle.model}</h3>
              <h4>{bicycle.price} </h4>
              <p>{bicycle.location}</p>
            </div>{" "}
          </>
        );
      })}
      <BottomNavigation />
    </>
  );
};

export default HomePage;
