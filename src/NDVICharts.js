import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from "recharts";

// Given NDVI data
const rawData = {
  "01": { "min": 0.0, "max": 0.5416, "mean": 0.1391 },
  "02": { "min": 0.0, "max": 0.2701, "mean": 0.0423 },
  "03": { "min": 0.0, "max": 0.9574, "mean": 0.3537 },
  "04": { "min": 0.2658, "max": 4.9047, "mean": 2.2031 },
  "05": { "min": 0.0, "max": 6.9728, "mean": 1.4220 },
  "06": { "min": 0.0, "max": 2.0946, "mean": 0.4590 },
  "07": { "min": 0.0, "max": 1.8000, "mean": 0.5260 },
  "08": { "min": 0.0, "max": 2.1250, "mean": 0.3576 },
  "09": { "min": 0.0, "max": 2.4055, "mean": 0.6571 },
  "10": { "min": 1.0329, "max": 8.1584, "mean": 4.1223 },
  "11": { "min": 0.8712, "max": 10.5362, "mean": 6.6796 },
  "12": { "min": 0.4325, "max": 4.8705, "mean": 1.7489 },
};

// Convert data into an array format suitable for Recharts
const data = Object.entries(rawData).map(([month, values]) => ({
  name: `Month ${month}`,
  minNDVI: values.min,
  meanNDVI: values.mean,
  maxNDVI: values.max,
}));

const NDVIChart = () => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <h2>Monthly NDVI Trends</h2>
      <ResponsiveContainer >
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          
          <XAxis dataKey="name" >
          <Label value="Pages of my website" offset={200} position="Bottom" /> 
          </XAxis>
          
          <YAxis> 
          <Label value="Pages of my website" angle = "-90" offset={0} position="left" />
          </YAxis>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="minNDVI" stroke="#ff7300" name="Min NDVI" />
          <Line type="monotone" dataKey="meanNDVI" stroke="#8884d8" name="Mean NDVI" />
          <Line type="monotone" dataKey="maxNDVI" stroke="#82ca9d" name="Max NDVI" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NDVIChart;
