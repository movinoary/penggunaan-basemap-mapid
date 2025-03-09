import React from "react";
import { Map, Source, Layer } from "@vis.gl/react-maplibre";

const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [107.609811, -6.914744] },
    },
  ],
};

const layerStyle = {
  id: "point",
  type: "circle",
  paint: {
    "circle-radius": 10,
    "circle-color": "#007cbf",
  },
};

const PointStatic = () => {
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
      <Source id="my-data" type="geojson" data={geojson}>
        <Layer {...layerStyle} />
      </Source>
    </Map>
  );
};

export default PointStatic;
