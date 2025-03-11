import React from "react";
import { MapContainer, TileLayer, WMSTileLayer  } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const position = [-0.8, 40.0]; // Adjust center based on your dataset (EPSG:32637)

const BasicMap = () => {
  return (
    <div>
      <h2>Leaflet Map Viewer with GeoServer WMS</h2>
      <MapContainer center={position} zoom={7} style={{ height: "300px", width: "100%" }}>
        {/* OpenStreetMap Basemap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* GeoServer WMS Layer with 'ndvi' Style */}
        <WMSTileLayer
          url="http://localhost:8080/geoserver/demo/wms?"
          layers="demo:ndvi_2010_06"
          format="image/png"
          transparent={true}
          attribution="&copy; GeoServer WMS"
          version="1.1.0"
          styles="ndvi" // <== Ensure NDVI style is applied
        />
      </MapContainer>
    </div>
  );
};

export default BasicMap;
