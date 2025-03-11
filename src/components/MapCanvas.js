import React, { useState } from 'react';
import { MapContainer, TileLayer, WMSTileLayer,Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapControls from './MapControls';

const position = [0.60, 39.80];

const polygonCoords = [
  [position[0] - 0.05, position[1] - 0.06], // Bottom-left
  [position[0] - 0.02, position[1] + 0.05], // Bottom-right
  [position[0] + 0.04, position[1] + 0.02], // Mid-right
  [position[0] + 0.03, position[1] - 0.04], // Mid-bottom
  [position[0] + 0.01, position[1] - 0.07], // Bottom-tip
  [position[0] - 0.05, position[1] - 0.06], // Closing the polygon
];


export default function MapCanvas() {
  const [dataset, setDataset] = useState('ndvi');
  const [year, setYear] = useState('2010');
  const [month, setMonth] = useState('01');
  const [layerKey, setLayerKey] = useState(0); // This will force the layer to reload

  const fetchData = () => {
    console.log(`Fetching data for: ${dataset}_${year}_${month}`);
    setLayerKey((prevKey) => prevKey + 1); // Force WMSTileLayer to refresh
  };

  return (
    <div className='map-canvas'>
      {/* Controls with Fetch Button */}
      <MapControls year={year} setYear={setYear} month={month} setMonth={setMonth} fetchData={fetchData} />

      <MapContainer center={position} zoom={7} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />

        {/* GeoServer WMS Layer */}
        <WMSTileLayer
            key={layerKey} 
            url="http://localhost:8080/geoserver/demo/wms?"
            layers={`demo:${dataset}_${year}_${month}`}
            format="image/png"
            transparent={true}
            attribution="&copy; GeoServer WMS"
            version="1.1.0"
            styles="ndvi"
        />

      <Polygon
        pathOptions={{ color: "red", fillColor: "orange", fillOpacity: 0.5 }}
        positions={polygonCoords}
      />

        
      </MapContainer>

      {/* Display Selected Time */}
      <div className='map-time'> NDVI {year} {month} </div>
    </div>
  );
}
