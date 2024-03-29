import React, { useEffect, useRef, useState } from "react";
import GoogleMapReact from "google-map-react";
import Pin from "../pin/Pin";
import ItemCardOnMap from "../itemsListAndCard/itemCardOnMap/ItemCardOnMap";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const SimpleMap = ({ bicyclesList, favoritesList, refresh, toggleRefresh }) => {
  const staticCenter = {
    lat: 40.4165,
    lng: -3.70256,
    zoom: 13,
  };

  const [selectedBicycle, setSelectedBicycle] = useState(null);
  const [itemCardPosition, setItemCardPosition] = useState();
  const [isMobile, setIsMobile] = useState(false);

  const handlePinClick = (bicycle, event) => {
    setSelectedBicycle(bicycle);

    const offsetX = 30;
    const offsetY = -100;
    setItemCardPosition({
      x: event.clientX + offsetX,
      y: event.clientY + offsetY,
    });
  };

  const handleCloseItemClick = () => {
    setSelectedBicycle(null);
  };

  const handleMapClick = () => {
    handleCloseItemClick();
  };

  useEffect(() => {
    const isMobileDevice = () => {
      return window.innerWidth <= 600;
    };

    setIsMobile(isMobileDevice());
  }, [selectedBicycle]);

  return (

    <div className="w-100 h-100">
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY }}
        defaultCenter={[staticCenter.lat, staticCenter.lng]}
        defaultZoom={staticCenter.zoom}
        onClick={handleMapClick}
      >
        {bicyclesList.map((bicycle, index) => (
          <Pin
            key={index}
            lat={parseFloat(bicycle.lat)}
            lng={parseFloat(bicycle.lng)}
            text="My BIKEE"
            onClick={(event) => handlePinClick(bicycle, event)}
          />
        ))}
      </GoogleMapReact>
      {selectedBicycle && (
        <div
          className={isMobile ? "mobile-div white absolute" : "white absolute"}
          style={{
            top: isMobile ? "calc(100vh - 5rem)" : itemCardPosition.y,
            left: isMobile ? "0" : itemCardPosition.x,
          }}
        >
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
        </div>
      )}
    </div>
  );
};

export default SimpleMap;
