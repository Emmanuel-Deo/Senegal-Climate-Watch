import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, WMSTileLayer,GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapControls from './MapControls';
import wellknown from 'wellknown';

const position = [14.50046465750006, -14.438181045999954];

const boundaryStyle = {
  color: "#007BFF", // Blue outline
  weight: 0.7,
  opacity: 1,
  fillColor: "#90CAF9", // Light blue fill
  fillOpacity: 0.4,
};


export default function MapCanvas() {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [wktPolygon, setWktPolygon] = useState("")
  
  useEffect(() => {
    fetch('/level_03.geojson')
      .then(response => response.json())
      .then(data => {
        setGeoJsonData(data);
  
        // Convert first polygon to WKT (modify as needed)
        if (data.features.length > 0) {
          const wktPolygon = wellknown.stringify(data.features[0].geometry);
          setWktPolygon(wktPolygon);
          console.log(wktPolygon )
        }
      })
      .catch(error => console.error("Error loading GeoJSON:", error));
  }, []);




  const [dataset, setDataset] = useState('NDVI');
  const [frequency, setFrequency] = useState('MONTHLY');
  const [year, setYear] = useState('2001');
  const [month, setMonth] = useState('9');
  const [layerKey, setLayerKey] = useState(0); // This will force the layer to reload

  const fetchData = () => {
    console.log(`Fetching data for: ${dataset}_${frequency}_${year}_${month}`);
    setLayerKey((prevKey) => prevKey + 1); // Force WMSTileLayer to refresh
  };

  return (
    <div className='map-canvas'>
      {/* Controls with Fetch Button */}
      <MapControls year={year} setYear={setYear} month={month} setMonth={setMonth} fetchData={fetchData} />

      <MapContainer center={position} zoom={7} style={{ height: "100%", width: "100%" , borderRadius: "10px 10px 0px 0px"}}>
        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
        

        {/* GeoServer WMS Layer */}
        <WMSTileLayer
            key={layerKey} 
            url="http://localhost:8080/geoserver/demo/wms?"
            layers={`demo:${dataset}_${frequency}_${year}_${month}`}
            format="image/png"
            transparent={true}
            attribution="&copy; GeoServer WMS"
            version="1.1.0"
            styles="ndvi"
           
        />

        {/* {geoJsonData && <GeoJSON data={geoJsonData} style={boundaryStyle} />} */}
        
      </MapContainer>

      {/* Display Selected Time */}
      <div className='map-time'> NDVI {year} {month} </div>
    </div>
  );
}
