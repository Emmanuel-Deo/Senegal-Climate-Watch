import React, { useEffect } from "react";

export default function MapControls({ year, setYear, month, setMonth, fetchData }) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  useEffect(() => {
    fetchData();
  }, [year, month]); // Auto-fetch on change

  return React.createElement(
    "div",
    { className: "controls-container" },
    // Year Selector (Left Side)
    React.createElement(
      "div",
      { className: "year-selector" },
      React.createElement("button", { onClick: () => setYear((prev) => Number(prev) - 1) }, "«"),
      React.createElement("span", { className: "selected-year" }, year),
      React.createElement("button", { onClick: () => setYear((prev) => Number(prev) + 1) }, "»")
    ),
    // Month Selector (Right Side)
    React.createElement(
      "div",
      { className: "month-slider" },
      months.map((m, index) =>
        React.createElement(
          "span",
          {
            key: index,
            className: `month ${Number(month) === index + 1 ? "selected" : ""}`,
            onClick: () => setMonth(index + 1),
          },
          m
        )
      )
    )
  );
}
