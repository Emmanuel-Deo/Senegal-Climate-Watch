import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create Context
export const MapContext = createContext();

// Context Provider Component
export const MapProvider = ({ children }) => {
  const [aoi, setAoi] = useState("Senegal");
  const [dataset, setDataset] = useState("NDVI");
  const [frequency, setFrequency] = useState("MONTHLY");
  const [year, setYear] = useState("2003");
  const [month, setMonth] = useState("10");
  const [layerKey, setLayerKey] = useState(0); // For forcing re-render
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false); // Handle loading state

  // Function to update values and refresh the map
  const updateValues = (newAoi, newDataset, newFrequency, newYear, newMonth) => {
    setAoi(newAoi);
    setDataset(newDataset);
    setFrequency(newFrequency);
    setYear(newYear);
    setMonth(newMonth);
    
  };

   // Function to fetch Zonal Statistics
   const fetchZonalStats = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/zonal-stats", {
        wcs_url: `http://localhost:8080/geoserver/demo/wcs?service=WCS&version=2.0.1&request=GetCoverage&coverageId=demo:NDVI_${frequency}_${year}&format=image/tiff&bbox=38.550176338565365,-2.1500098347059806,41.700190747553194,3.800017382271035&width=300&height=500&crs=EPSG:4326`, // Adjusted URL
        shapefile_path: "C:/Users/emman/Desktop/Development/GIS/geo-app/public/level_00.geojson",
        year
      });

      setStats(response.data.band_stats);
      console.log("📊 Zonal Statistics:", response.data.band_stats);
    } catch (error) {
      console.error("⚠️ Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

 // Trigger re-render when dataset, month, or year changes
useEffect(() => {
  setLayerKey((prevKey) => prevKey + 1);
}, [aoi, dataset, month, year]);

// Fetch stats only when the year changes
useEffect(() => {
  fetchZonalStats();
}, [year]);

  return (
    <MapContext.Provider
      value={{
        aoi,
        setAoi,
        dataset,
        setDataset,
        frequency,
        setFrequency,
        year,
        setYear,
        month,
        setMonth,
        layerKey,
        stats, // Expose stats
        fetchZonalStats, // Allow manual trigger if needed
        loading // Expose loading state
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

// Custom Hook to Use Context
export const useMapContext = () => useContext(MapContext);
