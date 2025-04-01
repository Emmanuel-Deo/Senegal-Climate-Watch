import React from "react";
import { useMapContext } from "./MapContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

import ClipLoader from "react-spinners/ClipLoader";



const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export default function AnalysisTop() {
  const { month, year, setYear, dataset, ndviData, loading } = useMapContext(); // Get context values
  const selectedMonthName = monthNames[parseInt(month, 10) - 1]; // Convert to month name

  // ✅ Dynamically set the dataset key
  const datasetKey = dataset.toLowerCase(); // Ensure lowercase match
  
  return (
    <div className="analysis-top">
      <h2>Monthly Mean Data Analysis</h2>
      <h3>{dataset}</h3>

      {/* Year Selector with Increment/Decrement Buttons */}
      <div className="year-selector">
        <button onClick={() => setYear((prev) => Number(prev) - 1)}>«</button>
        <span className="selected-year">{year}</span>
        <button onClick={() => setYear((prev) => Number(prev) + 1)}>»</button>
      </div>

      {loading ? (
        <ClipLoader
          
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
          css={{ display: "block", margin: "0 auto", borderColor: "red" }} // Inline styles instead of a constant
        />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={ndviData} margin={{ top: 20, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 1]} />
            <Tooltip />
            {/* ✅ Reference Line dynamically adjusts to the selected month */}
            <ReferenceLine 
              x={selectedMonthName} 
              stroke="red" 
              strokeDasharray="3 3" 
              label={{ value: selectedMonthName, position: "top", fill: "red" }} 
            />
            {/* ✅ Uses the selected dataset dynamically */}
            <Line 
              type="monotone" 
              dataKey={datasetKey} // Dynamic dataset key
              stroke="#82ca9d" 
              strokeWidth={2} 
              dot={{ r: 5 }}
              fontSize={8}
              fontWeight={2}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
