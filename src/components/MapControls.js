import React from "react";

export default function MapControls({ year, setYear, month, setMonth, fetchData }) {
  // Generate years from 2000 to the current year
  const years = Array.from({ length: new Date().getFullYear() - 1999 }, (_, i) => (2000 + i).toString());
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, ''));

  return (
    <div className="controls">
      <label>Year:
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </label>

      <label>Month:
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          {months.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </label>

      <button onClick={fetchData}>Fetch Data</button>
    </div>
  );
}
