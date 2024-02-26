import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import Pin from "../components/Pin";
import ItemCard from "./itemsListAndCard/ItemCard";
import ItemCardOnMap from "./itemsListAndCard/itemCardOnMap/ItemCardOnMap";

const SimpleMap = ({ bicyclesList, favoritesList, refresh, toggleRefresh }) => {
  const staticCenter = {
    lat: 40.4165,
    lng: -3.70256,
    zoom: 13,
  };

  const [selectedBicycle, setSelectedBicycle] = useState(null);

  const handlePinClick = (bicycle) => {
    console.log("clicked");
    setSelectedBicycle(bicycle);
  };

  const getRandomOffset = () => {
    return (Math.random() - 0.5) * 0.01;
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100vw" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAqpZyIprpf5ykPCIn-RpYuuMiWnLeVOyk" }}
        defaultCenter={[staticCenter.lat, staticCenter.lng]}
        defaultZoom={staticCenter.zoom}
      >
        {bicyclesList.map((bicycle, index) => (
          <Pin
            key={index}
            lat={
              bicycle.lat
                ? parseFloat(bicycle.lat)
                : staticCenter.lat + getRandomOffset()
            }
            lng={
              bicycle.lng
                ? parseFloat(bicycle.lng)
                : staticCenter.lng + getRandomOffset()
            }
            text="My BIKEE"
            onClick={() => handlePinClick(bicycle)}
          />
        ))}
      </GoogleMapReact>
      {selectedBicycle && (
        <ItemCardOnMap
          key={selectedBicycle._id}
          bicycle={selectedBicycle}
          refresh={refresh}
          toggleRefresh={toggleRefresh}
          isFavorite={
            Array.isArray(favoritesList)
              ? favoritesList.findIndex(
                  (fav) => fav._id === selectedBicycle._id
                ) !== -1
              : false
          }
        />
      )}
    </div>
  );
};

export default SimpleMap;
