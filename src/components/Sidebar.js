import React from "react";
import { useMapContext } from "./MapContext";
import { WiRaindrops, WiThermometer } from "react-icons/wi";
import { FaLeaf } from "react-icons/fa"; // For NDVI

export default function Sidebar() {
  const { dataset, setDataset, aoi, setAoi, month, year, frequency } = useMapContext();

  return (
    <div className="sidebar">
      <h3>Select Dataset</h3>
      <div className="dataset-buttons">
        <button
          className={dataset === "PPT" ? "active" : ""}
          onClick={() => setDataset("PPT")}
        >
          <WiRaindrops size={24} style={{ marginRight: "5px" }} />
          Precipitation (PPT)
        </button>

        <button
          className={dataset === "LST" ? "active" : ""}
          onClick={() => setDataset("LST")}
        >
          <WiThermometer size={24} style={{ marginRight: "5px" }} />
          Temperature (LST)
        </button>

        <button
          className={dataset === "NDVI" ? "active" : ""}
          onClick={() => setDataset("NDVI")}
        >
          <FaLeaf size={20} style={{ marginRight: "5px" }} />
          Vegetation (NDVI)
        </button>
      </div>

      <h3>Select AOI</h3>
      <select value={aoi} onChange={(e) => setAoi(e.target.value)}>
        <option value="Senegal">Senegal</option>
        <option value="Garissa">Garissa</option>
      </select>

      <p>{aoi}_{dataset}_{year}_{frequency}_{month}</p>
    </div>
  );
}
