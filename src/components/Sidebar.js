import React from "react";
import { useMapContext } from "./MapContext";

export default function Sidebar() {
  const { dataset, setDataset, aoi, setAoi, month, year } = useMapContext();

  return (
    <div className="sidebar">
      <h3>Select Dataset</h3>
      <button className={dataset === "NDVI" ? "active" : ""} onClick={() => setDataset("NDVI")}>NDVI</button>
      <button className={dataset === "PPT" ? "active" : ""} onClick={() => setDataset("PPT")}>PPT</button>

      <h3>Select AOI</h3>
      <select value={aoi} onChange={(e) => setAoi(e.target.value)}>
        <option value="Senegal">Senegal</option>
        <option value="Garissa">Garissa</option>
      </select>

      <p> {aoi}_{dataset}_{year}_{month}</p>

    </div>
  );
}
