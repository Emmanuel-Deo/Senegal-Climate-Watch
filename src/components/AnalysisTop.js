import React from "react";
import { useMapContext } from "./MapContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from "recharts";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function AnalysisTop() {
  const { month, year, setYear, dataset, stats } = useMapContext(); // Get context values
  const selectedMonthName = monthNames[parseInt(month, 10) - 1]; // Convert to month name

  // Convert stats object into an array for Recharts
  const data = stats
    ? Object.keys(stats).map((band, index) => ({
        name: monthNames[index], // Use month names
        mean: stats[band]?.mean || 0, // Ensure a fallback value
      }))
    : [];

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

      <ResponsiveContainer width="100%" height={400}>
        {stats && Object.keys(stats).length > 0 ? (
          <LineChart data={data} margin={{ top: 50, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fontFamily: "Arial", fill: "#333" }} />
            <YAxis label={{ value: "Mean Values", angle: -90, position: "Left", fontSize: 12, fontWeight: "bold" }} />
            <Tooltip />
            <Legend />

            {/* Highlight Selected Month with a Reference Line */}
            <ReferenceLine x={selectedMonthName} stroke="red" strokeDasharray="3 3" label={{ value: selectedMonthName, position: "top", fill: "red" }} />

            {/* Mean Lines */}
            <Line type="monotone" dataKey="mean" stroke="#3385FF" strokeWidth={2} dot={{ r: 3 }} name="Mean (Raw)" />
            <Line type="monotone" dataKey="meanLTM" stroke="#FF5733" strokeWidth={2} dot={{ r: 3 }} name="Mean (LTM)" />
          </LineChart>
        ) : (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <p>Loading...</p>
          </div>
        )}
      </ResponsiveContainer>
    </div>
  );
}
