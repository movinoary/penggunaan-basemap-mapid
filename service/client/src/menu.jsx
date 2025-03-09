import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Menu = () => {
  const pathSegments = window.location.pathname.split("/")[1];
  const navigate = useNavigate();

  return (
    <section className="nav">
      <button
        className={pathSegments === "maps" ? "active" : "noActive"}
        onClick={() => navigate("/maps")}
      >
        Maps
      </button>
      <button
        className={pathSegments === "point-static" ? "active" : "noActive"}
        onClick={() => navigate("/point-static")}
      >
        Point Static
      </button>
      <button
        className={pathSegments === "point-dynamic" ? "active" : "noActive"}
        onClick={() => navigate("/point-dynamic")}
      >
        Point Dynamic
      </button>
    </section>
  );
};

export default Menu;
