import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer,GeoJSON } from 'react-leaflet'

const position = [14.50046465750006, -14.438181045999954];

export default function AreaPreview() {
  const [geoJsonData, setGeoJsonData] = useState(null); // State to store GeoJSON data

  // Load GeoJSON from the public folder when the component mounts
  useEffect(() => {
    fetch('/level_03.geojson') // File should be in the public folder
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


  return (
    <div className='area-preview'>
            <MapContainer 
              center={position} 
              zoom={6} 
              style={{ height: "100%", width: "100%" }}
              zoomControl = {false}>
            
               <TileLayer url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' />
      

        {geoJsonData && <GeoJSON data={geoJsonData} style={boundaryStyle} />}
              
            </MapContainer>
            

    </div>
  )
}
