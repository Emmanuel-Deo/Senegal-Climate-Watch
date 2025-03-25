import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, WMSTileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapControls from "./MapControls";
import { useMapContext } from "./MapContext";
import Sidebar from "./Sidebar";

const position = [14.50046465750006, -14.438181045999954];

const basemaps = [
  
    {
    name: "ESRI Satellite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    thumbnail: "https://www.freeiconspng.com/thumbs/links-icon/links-icon-16.png"
  },
  {
    name: "OpenStreetMap",
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    thumbnail: "https://png.pngtree.com/png-vector/20190116/ourmid/pngtree-vector-link-icon-png-image_322157.jpg"
  },

  {
    name: "OpenTopoMap",
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwLmLP4Sxa6L32l61tPmqLT7ymj5D3HTHHwg&s"
  }
];

export default function MapCanvas() {
  const { dataset, aoi, year, month, frequency, layerKey } = useMapContext();
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [opacity, setOpacity] = useState(1.0);
  const [selectedBasemap, setSelectedBasemap] = useState(basemaps[0].url);

  // Automatically switch SLD styles based on dataset value
  const selectedStyle = dataset === "NDVI" ? "ndvi" : dataset === "PPT" ? "rainfall" : "default";

  useEffect(() => {
    fetch('/selected_level_03.geojson') 
      .then(response => response.json())
      .then(data => setGeoJsonData(data))
      .catch(error => console.error("Error loading GeoJSON:", error));
  }, []);

  return (
    <div className="map-canvas">
      <Sidebar/>
      <div
        style={{
          position: "absolute",
          zIndex: 1000,
          top: 10,
          left: 10,
          background: "#fff",
          padding: 8,
          borderRadius: 5,
          display: "flex",
          flexDirection: "", // Stack items vertically
          alignItems: "center",
          width: "fit-content",
          gap: 10,
        }}
      >
        {basemaps.map((base) => (
          <div key={base.name} style={{ textAlign: "center", marginBottom: 10 }}>
            <img
              src={base.thumbnail}
              alt={base.name}
              title={base.name}
              onClick={() => setSelectedBasemap(base.url)}
              style={{
                width: 50,
                height: 50,
                cursor: "pointer",
                border: selectedBasemap === base.url ? "2px solid blue" : "2px solid transparent",
                borderRadius: "5px"
              }}
            />
            <div
              style={{
                fontSize: "10px",
                marginTop: "3px",
                fontWeight: selectedBasemap === base.url ? "bold" : "normal"
              }}
            >
              {base.name}
            </div>
          </div>
        ))}
      </div>

     
      {/* Basemap Selector Dropdown */}
   
      <MapContainer center={position} zoom={3} style={{ height: "100%", width: "100%" }}>
        {/* <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" /> */}
        <TileLayer url={selectedBasemap} />
        <WMSTileLayer
          key={layerKey} // Forces re-render when values change
          url="http://localhost:8080/geoserver/demo/wms?"
          layers={`demo:${aoi}_${dataset}_${year}_${frequency}_${month}`}
          format="image/png"
          transparent={true}
          opacity={opacity}
          version="1.0"
          styles={selectedStyle}
        />

        {geoJsonData && <GeoJSON data={geoJsonData} style={{ color: "#007BFF", weight: 0.7, fillOpacity: 0.4 }}/>}
      </MapContainer>

         {/* Display Selected Time */}
         <div className="map-time">
        <MapControls/>
      </div>

      {/* Opacity Slider */}
      <div className="opacity-slider">
        <label>Opacity: {Math.round(opacity * 100)}%</label>
        <input type="range" min="0" max="1" step="0.01" value={opacity} onChange={(e) => setOpacity(parseFloat(e.target.value))} />
      </div>
    </div>
  );
}
