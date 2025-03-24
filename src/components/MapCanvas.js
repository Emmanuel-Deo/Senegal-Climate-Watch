import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, WMSTileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapControls from "./MapControls";
import wellknown from "wellknown";

const position = [14.50046465750006, -14.438181045999954];

const boundaryStyle = {
  color: "#007BFF03", // Blue outline
  weight: 0.7,
  opacity: 1,
  fillColor: "#90CAF9", // Light blue fill
  fillOpacity: 0,
};

export default function MapCanvas() {
  const [geoJsonData, setGeoJsonData] = useState(null); // State to store GeoJSON data
  const [opacity, setOpacity] = useState(1.0);


  // Load GeoJSON from the public folder when the component mounts
  useEffect(() => {
    fetch('/selected_level_03.geojson') // File should be in the public folder
      .then(response => response.json())
      .then(data => setGeoJsonData(data))
      .catch(error => console.error("Error loading GeoJSON:", error));
  }, []);

  // Style settings for boundaries
  const boundaryStyle = {
    color: "#007BFF", // Blue outline
    weight: 0.7,
    opacity: 1,
    fillColor: "#90CAF9", // Light blue fill
    fillOpacity: 0.4,
  };


  const [aoi, setAoi] = useState("Senegal");
  const [dataset, setDataset] = useState("NDVI");
  const [frequency, setFrequency] = useState("MONTHLY");
  const [year, setYear] = useState("2003");
  const [month, setMonth] = useState("12");
  const [layerKey, setLayerKey] = useState(0); // This will force the layer to reload

  const baseMaps = {
    osm: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    arcgis: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    opentopomap: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
  };


  const fetchData = () => {
    console.log(`Fetching data for: ${aoi}_${dataset}_${year}_${frequency}_${month}`);
    setLayerKey((prevKey) => prevKey + 1); // Force WMSTileLayer to refresh
  };

  return (
    <div className="map-canvas">
  
      <MapContainer
        center={position}
        zoom={7}
        style={{ height: "100%", width: "100%", borderRadius: "10px 10px 0px 0px" }}
      >
        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />


        GeoServer WMS Layer
        <WMSTileLayer
          key={layerKey}
          url="http://localhost:8080/geoserver/demo/wms?"
          layers={`demo:${aoi}_${dataset}_${year}_${frequency}_${month}`}
          format="image/png"
          srs="EPSG:4326"
          transparent={true}
          opacity={opacity} // Apply opacity dynamically
          attribution="&copy; GeoServer WMS"
          version="1.0"
          styles="ndvi"
        />

        

        

        {/* Render boundaries if GeoJSON is available */}
        {geoJsonData && <GeoJSON data={geoJsonData} style={boundaryStyle}/>}
      </MapContainer>

      {/* Display Selected Time */}
      <div className="map-time">
        <MapControls
        year={year}
        setYear={setYear}
        month={month}
        setMonth={setMonth}
        fetchData={fetchData}
      />
      </div>


      {/* Opacity Slider */}
      <div className="opacity-slider">
        <label>Opacity: {Math.round(opacity * 100)}%</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={opacity}
          onChange={(e) => setOpacity(parseFloat(e.target.value))}
        />
      </div>

         {/* Legend Container */}
         <div className="map-legend">
            <h4>NDVI Legend</h4>
            <div className="legend-item">
              <span className="legend-color" style={{ background: "#d73027" }}></span> Low NDVI (-1 to 0)
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ background: "#f46d43" }}></span> Moderate NDVI (0 to 0.2)
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ background: "#fee08b" }}></span> Medium NDVI (0.2 to 0.4)
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ background: "#66bd63" }}></span> High NDVI (0.4 to 0.6)
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ background: "#1a9850" }}></span> Very High NDVI (0.6 to 1)
            </div>
         </div>




    </div>
  );
}