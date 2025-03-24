import React, { useEffect } from "react";

export default function MapControls({ year, setYear, month, setMonth, fetchData }) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Auto-fetch data when year or month changes
  useEffect(() => {
    fetchData();
  }, [year, month]); // Runs when year or month changes

  return (
    <div className="controls">
      {/* Year Selection */}
      <div className="year-selector">
        <button onClick={() => setYear((prev) => Number(prev) - 1)}>{"<"}</button>
        <span className="selected-year">{year}</span>
        <button onClick={() => setYear((prev) => Number(prev) + 1)}>{">"}</button>
      </div>

      {/* Month Selection */}
      <div className="month-selector">
        {months.map((m, index) => (
          <span
            key={index}
            className={`month ${Number(month) === index + 1 ? "selected" : ""}`}
            onClick={() => setMonth(index + 1)}
          >
            {m}
          </span>
        ))}
      </div>

      {/* Styles */}
      <style jsx>{`
        .controls {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .year-selector {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 18px;
        }

        .year-selector button {
          padding: 5px 10px;
          font-size: 16px;
          cursor: pointer;
          background-color: #ddd;
          border: none;
          border-radius: 5px;
          transition: 0.2s;
        }

        .year-selector button:hover {
          background-color: #bbb;
        }

        .selected-year {
          background-color: #007bff;
          color: white;
          padding: 5px 15px;
          border-radius: 5px;
          font-weight: bold;
        }

        .month-selector {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 10px;
          white-space: nowrap;
          overflow-x: auto;
        }

        .month {
          cursor: pointer;
          padding: 5px 10px;
          border-radius: 5px;
          transition: 0.2s;
        }

        .month.selected {
          background-color: #007bff;
          color: white;
        }

        .month:hover {
          background-color: #ddd;
        }
      `}</style>
    </div>
  );
}
