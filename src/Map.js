// Package
import React, { useState } from "react";
import MapGL, { Source, Layer, Popup } from "@urbica/react-map-gl";
import { circle } from "@turf/turf";
import axios from "axios";

// Data geojson
import dataSma from "./dataSMA.geojson";
import dataWilayah from "./dataWilayah.geojson";

// Styling
import "mapbox-gl/dist/mapbox-gl.css";

const Map = () => {
  // Kumpulan Data
  const [dataPopup, setDataPopup] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [dataBuffer, setDataBuffer] = useState({});
  const [dataIsochrone, setDataIsochrone] = useState({});

  // Menampilkan Mode
  const [showBuffer, setShowBuffer] = useState(false);
  const [showIsochrone, setShowIsochrone] = useState(false);
  const [showMode, setShowMode] = useState("");
  const [showInfo, setShowInfo] = useState("");

  // Seting Isochrone
  const [profile, setProfile] = useState("");
  const [methods, setMethods] = useState("");
  const [interval, setInterval] = useState("");

  const MAP_SERVICE_KEY = "67b74a388bd6017a6d11772a";
  const token =
    "pk.eyJ1Ijoidmlub2FyeXN0aW8iLCJhIjoiY2x2M2JhMXlmMHBlaTJsb3FsM3hnNzBvOCJ9.9t-e--GUark8BwfBuRDchg";
  const [viewport, setViewport] = useState({
    latitude: -6.914744,
    longitude: 107.609811,
    zoom: 12,
  });

  const handleClick = (e) => {
    setDataPopup(e);
    setShowPopup(!showPopup);
  };

  const handleClose = () => setShowPopup(!showPopup);

  const clickBuffer = (e) => {
    let center = [e.lng, e.lat];
    let options = {
      steps: 64,
      units: "kilometers",
      properties: {},
    };
    let buffer = circle(center, 1, options);
    setShowBuffer(true);
    setShowIsochrone(false);
    setDataBuffer(buffer);
  };

  const clickModeIsochrone = () => {
    setShowIsochrone(true);
    setShowMode("isochrone");
    setDataIsochrone({});
    setProfile("");
    setMethods("");
    setInterval("");
  };

  const clickIsochrone = async () => {
    let coordinates = dataPopup?.lngLat;

    const body = {
      longitude: coordinates?.lng,
      latitude: coordinates?.lat,
      profile: profile,
      methods: methods,
      interva: interval,
      color: "0ca5eb",
      denoise: "0",
    };

    const res = await axios.get(
      `https://api.mapbox.com/isochrone/v1/mapbox/${body.profile}/${body.longitude}%2C${body.latitude}?${body.methods}=${body.interva}&contours_colors=${body.color}&polygons=true&denoise=${body.denoise}&access_token=${token}`
    );

    setDataIsochrone(res.data);
    setShowBuffer(false);
    setShowInfo("isochrone");
    setShowMode("");
  };

  return (
    <MapGL
      style={{ width: "100vw", height: "100vh" }}
      // mapStyle="mapbox://styles/mapbox/streets-v12"
      mapStyle={`https://basemap.mapid.io/styles/street-new-generation/style.json?key=${MAP_SERVICE_KEY}`}
      accessToken={token}
      latitude={viewport.latitude}
      longitude={viewport.longitude}
      zoom={viewport.zoom}
      onViewportChange={setViewport}
    >
      <Display
        title="bandung"
        data={dataWilayah}
        type="fill"
        color={{
          "fill-color": "#000",
          "fill-opacity": 0.3,
        }}
      />

      <Display
        title="sekolah"
        data={dataSma}
        type="circle"
        color={{
          "circle-color": ["get", "color"],
          "circle-radius": 5,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#fff",
        }}
        onClick={(e) => handleClick(e)}
      />

      {showBuffer ? (
        <Display
          title="buffer"
          data={dataBuffer}
          type="fill"
          color={{
            "fill-color": "#ff0000",
            "fill-opacity": 0.5,
          }}
        />
      ) : null}

      {showIsochrone ? (
        <>
          <Display
            title="isochrone_polygon"
            data={dataIsochrone}
            type="fill"
            color={{
              "fill-color": "#ff0000",
              "fill-opacity": 0.5,
            }}
          />
          <Display
            title="isochrone_line"
            data={dataIsochrone}
            type="line"
            color={{
              "line-color": "#00ff00",
              "line-width": 3,
            }}
          />
        </>
      ) : null}

      {showPopup && (
        <Popup
          tipSize={7}
          anchor="bottom"
          longitude={dataPopup?.lngLat?.lng ? dataPopup?.lngLat?.lng : null}
          latitude={dataPopup?.lngLat?.lat ? dataPopup?.lngLat?.lat : null}
          closeButton={false}
          closeOnClick={false}
        >
          <buttton onClick={() => handleClose()} className="close_popup">
            x
          </buttton>
          {showMode === "isochrone" ? (
            <div className="isochrone_section">
              <div className="isochrone_title">
                <h1>
                  {dataPopup?.features?.[0]?.properties?.name}{" "}
                  <span>Isochrone</span>
                </h1>
              </div>
              <div>
                <h3>Pilih Tipe Perjalanan</h3>
                <div className="isochrone_row_button">
                  <button
                    className="button"
                    id={profile === "walking" ? "white" : "green"}
                    onClick={() => setProfile("walking")}
                  >
                    Jalan
                  </button>
                  <button
                    className="button"
                    id={profile === "cycling" ? "white" : "green"}
                    onClick={() => setProfile("cycling")}
                  >
                    Sepedah
                  </button>
                  <button
                    className="button"
                    id={profile === "driving" ? "white" : "green"}
                    onClick={() => setProfile("driving")}
                  >
                    Mobil
                  </button>
                </div>
              </div>
              {profile ? (
                <div>
                  <h3>Pilih Tipe </h3>
                  <div className="isochrone_row_button">
                    <button
                      className="button"
                      id={methods === "contours_minutes" ? "white" : "green"}
                      onClick={() => setMethods("contours_minutes")}
                    >
                      Waktu
                    </button>
                    <button
                      className="button"
                      id={methods === "contours_meters" ? "white" : "green"}
                      onClick={() => setMethods("contours_meters")}
                    >
                      Jarak
                    </button>
                  </div>
                </div>
              ) : null}
              {methods === "contours_minutes" ? (
                <div>
                  <h3>Pilih Tipe Waktu</h3>
                  <select
                    className="select"
                    onChange={(e) => setInterval(e.target.value)}
                  >
                    <option hidden>Menit</option>
                    <option value="10">10 Menit</option>
                    <option value="20">20 Menit</option>
                    <option value="30">30 Menit</option>
                  </select>
                </div>
              ) : methods === "contours_meters" ? (
                <div>
                  <h3>Pilih Tipe Jarak</h3>
                  <select
                    className="select"
                    onChange={(e) => setInterval(e.target.value)}
                  >
                    <option hidden>Kilometer</option>
                    <option value="500">0,5 Kilometer</option>
                    <option value="1000">1 Kilometer</option>
                    <option value="5000">5 Kilometer</option>
                  </select>
                </div>
              ) : null}

              {interval ? (
                <button
                  className="button"
                  id="green"
                  onClick={() => clickIsochrone()}
                >
                  Tampilkan
                </button>
              ) : null}
            </div>
          ) : (
            <div className="popup">
              <h1>{dataPopup?.features?.[0]?.properties?.name}</h1>
              <div>
                <div className="popup_paragraf">
                  <p>alamat</p>
                  <h3>{dataPopup?.features?.[0]?.properties?.alamat}</h3>
                </div>
                <div className="popup_paragraf">
                  <p>No Telp</p>
                  <h3>{dataPopup?.features?.[0]?.properties?.telephone}</h3>
                </div>
              </div>
              {showInfo === "isochrone" ? (
                <div className="isochrone_info">
                  <h1>PIlihan Mode</h1>
                  <div className="isochrone_info_row">
                    <h3>Tipe Perjalanan</h3>
                    <button className="button" id="green">
                      {profile}
                    </button>
                  </div>
                  <div className="isochrone_info_row">
                    <h3>Tipe Metode</h3>
                    <button className="button" id="green">
                      {methods === "contours_minutes" ? "Menit" : "Jarak"}
                    </button>
                  </div>
                  <div className="isochrone_info_row">
                    <h3>
                      {methods === "contours_minutes" ? "Menit" : "Jarak"}
                    </h3>
                    <button className="button" id="green">
                      {interval}
                    </button>
                  </div>
                </div>
              ) : null}
              <div className="pupup_button">
                <button
                  className="button"
                  id="green"
                  onClick={() => clickBuffer(dataPopup?.lngLat)}
                >
                  buffer
                </button>
                <button
                  className="button"
                  id="white"
                  onClick={() => clickModeIsochrone()}
                >
                  isochrone
                </button>
              </div>
            </div>
          )}
        </Popup>
      )}
    </MapGL>
  );
};

export default Map;

export const Display = ({ title, data, color, type, onClick }) => {
  return (
    <section>
      <Source key={title} id={title} type="geojson" data={data} />
      <Layer
        id={title}
        type={type}
        source={title}
        paint={color}
        filter={["!", ["has", "point_count"]]}
        onClick={onClick}
      />
    </section>
  );
};
