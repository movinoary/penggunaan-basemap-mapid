import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Maps from "./pages/map";
import Menu from "./menu";
import PointStatic from "./pages/pointStatic";
import PointDynamic from "./pages/pointDynamic";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Menu />
        <Routes>
          <Route path="/maps" element={<Maps />} />
          <Route path="/point-static" element={<PointStatic />} />
          <Route path="/point-dynamic" element={<PointDynamic />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
