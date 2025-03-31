import React from "react";
import { useMapContext } from "./MapContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function AnalysisTop() {
  const { month, year, setYear, dataset, ndviData } = useMapContext(); // Get context values

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

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={ndviData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[0, 1]} />
          <Tooltip />
          <Line type="monotone" dataKey="ndvi" stroke="#82ca9d" strokeWidth={2} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
