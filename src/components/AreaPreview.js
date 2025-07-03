import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import AdminSelectionBar from './AdminSelectionBar';

const position = [14.50046465750006, -14.438181045999954];

export default function AreaPreview() {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [selection, setSelection] = useState({ adm1: "", adm2: "", adm3: "" });

  useEffect(() => {
    fetch('/level_03.geojson')
      .then(response => response.json())
      .then(data => setGeoJsonData(data))
      .catch(error => console.error("Error loading GeoJSON:", error));
  }, []);

 

  const highlightStyle = {
  color: "#222222",
  weight: 2,
  opacity: 1,
  fillColor: "#555555",
  fillOpacity: 0.6,
};

const backgroundStyle = {
  color: "#999999",
  weight: 0.5,
  opacity: 0.4,
  fillColor: "#cccccc",
  fillOpacity: 0.2,
};




  function styleFeature(feature) {
    const props = feature.properties;

    // Only highlight if ADM1 is chosen
    const isMatch =
      selection.adm1 &&
      props.ADM1_FR === selection.adm1 &&
      (!selection.adm2 || props.ADM2_FR === selection.adm2) &&
      (!selection.adm3 || props.ADM3_FR === selection.adm3);

    return isMatch ? highlightStyle : backgroundStyle;
  }

  return (
    <div className="area-preview" style={{ height: "100vh" }}>
      <AdminSelectionBar geoJsonData={geoJsonData} onSelectionChange={setSelection} />

      <div style={{ padding: "0.5rem 1rem", background: "#f7f7f7", borderBottom: "1px solid #ddd" }}>
        <strong>Selected:</strong> {selection.adm1 || "--"} / {selection.adm2 || "--"} / {selection.adm3 || "--"}
      </div>

      <MapContainer 
        center={position} 
        zoom={6} 
        style={{ height: "calc(100% - 80px)", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' />

        {geoJsonData && <GeoJSON data={geoJsonData} style={styleFeature} />}
      </MapContainer>
    </div>
  );
}
