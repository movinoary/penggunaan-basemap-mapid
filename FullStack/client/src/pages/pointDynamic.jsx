import React, { useEffect, useState } from "react";
import { Map, Source, Layer } from "@vis.gl/react-maplibre";
import axios from "axios";

const PointDynamic = () => {
  const [json, setJson] = useState([]);
  const MAP_SERVICE_KEY = "67b74a388bd6017a6d11772a";

  useEffect(() => {
    axios.get("http://localhost:4030/data-point").then(function (response) {
      setJson(response.data.data);
    });
  }, []);

  return (
    <Map
      initialViewState={{
        latitude: -6.914744,
        longitude: 107.609811,
        zoom: 5,
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle={`https://basemap.mapid.io/styles/street-new-generation/style.json?key=${MAP_SERVICE_KEY}`}
    >
      <Source id="my-data" type="geojson" data={json}>
        <Layer
          id="point"
          type="circle"
          paint={{
            "circle-radius": 8,
            "circle-color": "#ff0000",
          }}
        />
      </Source>
    </Map>
  );
};

export default PointDynamic;
