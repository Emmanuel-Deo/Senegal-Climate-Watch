import React from "react";
import { useMapContext } from "./MapContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from "recharts";
import ClipLoader from "react-spinners/ClipLoader";

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export default function AnalysisTop() {
  const {
    month,
    year,
    setYear,
    dataset,
    absolute,
    ltm,
    loading,
  } = useMapContext(); // Updated to use absolute & ltm
  const selectedMonthName = monthNames[parseInt(month, 10) - 1];
  const datasetKey = dataset.toLowerCase(); // Normalize

  // ✅ Merge both datasets (absolute and ltm) by month
  const mergedData = absolute.map((absItem, index) => {
    const ltmItem = ltm[index];
    return {
      month: absItem.month,
      absolute: absItem[datasetKey] ?? 0,
      ltm: ltmItem?.[datasetKey] ?? 0,
    };
  });

  return (
    <div className="analysis-top">
      <h2>Monthly Mean Data Analysis</h2>
      <h3>{dataset}</h3>
      <h3>{year}</h3>
      <h3>{month}</h3>

      {/* Year Selector */}
      <div className="year-selector">
        <button onClick={() => setYear((prev) => Number(prev) - 1)}>«</button>
        <span className="selected-year">{year}</span>
        <button onClick={() => setYear((prev) => Number(prev) + 1)}>»</button>
      </div>

      {loading ? (
        <ClipLoader
          loading={loading}
          size={40}
          aria-label="Loading Spinner"
          data-testid="loader"
          css={{ display: "block", margin: "0 auto", borderColor: "red" }}
        />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mergedData} margin={{ top: 20, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 1]} />
            <Tooltip />
            <Legend />
            <ReferenceLine
              x={selectedMonthName}
              stroke="red"
              strokeWidth={8}
              strokeDasharray="3 3"
              label={{
                value: selectedMonthName,
                position: "top",
                fill: "red",
  
              }}
            />
            <Line
              type="monotone"
              dataKey="absolute"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={{ r: 5 }}
              name={`${year} Observed`} // Label in tooltip
            />
            <Line
              type="monotone"
              dataKey="ltm"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 5 }}
              name="Long Term Mean"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
      <p className="chart-description">This graph analyzes the current year {year} trends against the long-term mean (LTM) of 2001 to 2020, 
        highlighting variability and deviations from long-term patterns</p>
    </div>
  );
}
