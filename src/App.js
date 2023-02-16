import "./App.css";
import Map from "./Map";

function App() {
  return (
    <section className="page_map">
      <nav className="nav_section">
        <h1 className="nav_logo">LOGO</h1>
        <h2 className="nav_title">Judul</h2>
      </nav>
      <div className="map_section">
        <Map />
        <div className="description_card"></div>
      </div>
      <div className="about_section">
        <div className="about_card"></div>
        <div className="about_card"></div>
      </div>
    </section>
  );
}

export default App;
