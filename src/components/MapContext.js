import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
    'https://gyjbkzxtsxbpwjmbvilm.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5amJrenh0c3hicHdqbWJ2aWxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyNDgzMzYsImV4cCI6MjA1NTgyNDMzNn0.7leWFkGhmI8Wo71P87K7xsNGJAmTRQ7mIeL_FO6wzx0' // 🔒 Replace with a secure environment variable
);

// Create Context
export const MapContext = createContext();

// Context Provider Component
export const MapProvider = ({ children }) => {
  const [aoi, setAoi] = useState("Senegal");
  const [dataset, setDataset] = useState("LST");
  const [frequency, setFrequency] = useState("MONTHLY");
  const [year, setYear] = useState("2003");
  const [month, setMonth] = useState("10");
  const [layerKey, setLayerKey] = useState(0); // For forcing re-render
  // const [stats, setStats] = useState(null);

  const [ndviData, setNdviData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);


  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];


  const fetchData = async () => {
    const selectField = `${aoi.toLowerCase()}->${dataset.toLowerCase()}`;
    try {
        const { data, error } = await supabase
            .from('climate_data')
            .select(`month, ${selectField}`) // ✅ Select month & NDVI from bomet
            .eq('year', year) 
            .order('month', { ascending: true }); // ✅ Order by month

        if (error) throw error;

        // ✅ Format data for Recharts
        const formattedData = data.map((item) => {
          const selectedVariable = dataset.toLowerCase(); // Get the selected dataset name dynamically
          return {
              month: monthNames[item.month - 1], // Convert numeric month to full name
              [selectedVariable]: item[selectedVariable] ?? 0, // Extract only the selected variable
          };
      });

        console.log("✅ NDVI Data:", formattedData);
        setNdviData(formattedData);
    } catch (err) {
        console.error("❌ Fetch Error:", err.message);
        setErrorMessage("Failed to fetch NDVI data.");
    } finally {
        setLoading(false);
    }
};





 // Trigger re-render when dataset, month, or year changes
useEffect(() => {
  setLayerKey((prevKey) => prevKey + 1);
}, [aoi, dataset, month, year]);


useEffect(()=> {
  fetchData();
},[aoi, dataset, month, year]);


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
        ndviData,
        fetchData,
        loading // Expose loading state
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

// Custom Hook to Use Context
export const useMapContext = () => useContext(MapContext);
