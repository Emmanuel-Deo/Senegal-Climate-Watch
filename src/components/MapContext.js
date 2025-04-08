import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client

const supabaseUrl = 'https://gyjbkzxtsxbpwjmbvilm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5amJrenh0c3hicHdqbWJ2aWxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyNDgzMzYsImV4cCI6MjA1NTgyNDMzNn0.7leWFkGhmI8Wo71P87K7xsNGJAmTRQ7mIeL_FO6wzx0';

const supabase = createClient(  supabaseUrl,  supabaseAnonKey);



// Create Context
export const MapContext = createContext();

// Context Provider Component
export const MapProvider = ({ children }) => {
  const [aoi, setAoi] = useState("Bomet");
  const [dataset, setDataset] = useState("LST");
  const [frequency, setFrequency] = useState("MONTHLY");
  const [year, setYear] = useState("2003");
  const [month, setMonth] = useState("10");
  const [layerKey, setLayerKey] = useState(0);

  const [absolute, setAbsolute] = useState([]);
  const [ltm, setLtm] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const formatData = (data, sourceName) => {
    const selectedVariable = dataset.toLowerCase();
    return data.map((item) => ({
      month: monthNames[item.month - 1],
      [selectedVariable]: item[selectedVariable] ?? 0,
      source: sourceName
    }));
  };

  const fetchData = async () => {
    const selectField = `${aoi.toLowerCase()}->${dataset.toLowerCase()}`;
    setLoading(true);

    try {
      // Fetch climate_data (observation)
      const { data: obsData, error: obsError } = await supabase
        .from("climate_data")
        .select(`month, ${selectField}`)
        .eq("year", year)
        .order("month", { ascending: true });

      if (obsError) throw obsError;

      const formattedObs = formatData(obsData, "observation");
      setAbsolute(formattedObs);

      // Fetch climate_data_ltm (long-term mean)
      const { data: ltmData, error: ltmError } = await supabase
        .from("climate_data_ltm")
        .select(`month, ${selectField}`)
        .order("month", { ascending: true });

      if (ltmError) throw ltmError;

      const formattedLtm = formatData(ltmData, "ltm");
      setLtm(formattedLtm);

      console.log("✅ Observation:", formattedObs);
      console.log("✅ LTM:", formattedLtm);

    } catch (err) {
      console.error("❌ Fetch Error:", err.message);
      setErrorMessage("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  // Trigger re-render and refetch when dependencies change
  useEffect(() => {
    setLayerKey((prevKey) => prevKey + 1);
    fetchData();
  }, [aoi, dataset, month, year]);

  return (
    <MapContext.Provider
      value={{
        aoi, setAoi,
        dataset, setDataset,
        frequency, setFrequency,
        year, setYear,
        month, setMonth,
        layerKey,
        absolute, setAbsolute,
        ltm, setLtm,
        fetchData,
        loading
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

// Custom Hook
export const useMapContext = () => useContext(MapContext);
