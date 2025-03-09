import React from "react";
import { Map } from "@vis.gl/react-maplibre";

const Maps = ({ children }) => {
  const MAP_SERVICE_KEY = "67b74a388bd6017a6d11772a";

  return (
    <Map
      initialViewState={{
        latitude: -6.914744,
        longitude: 107.609811,
        zoom: 3.5,
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle={`https://basemap.mapid.io/styles/street-new-generation/style.json?key=${MAP_SERVICE_KEY}`}
    >
      {children}
    </Map>
  );
};

export default Maps;
