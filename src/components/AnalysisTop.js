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
  AreaChart,
  ComposedChart,
  Area,
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
    maxData,
    minData, 
    loading,
  } = useMapContext();


  const selectedMonthIndex = parseInt(month, 10) - 1;
  const selectedMonthName = monthNames[selectedMonthIndex];
  const datasetKey = dataset?.toLowerCase(); // e.g. 'lst', 'rainfall', etc.

  console.log("absolute:", absolute);
  console.log("ltm:", ltm);
  console.log("minData:", minData);
  console.log("maxData:", maxData);

  const combinedData = absolute.map((item, index) => {
    const valueKey = datasetKey; // Use the dynamic dataset key
    const ltmValue = ltm[index]?.[valueKey] || 0;
    const minValue = minData[index]?.[valueKey] || 0;
    const maxValue = maxData[index]?.[valueKey] || 0;

    return {
      month: item.month,
      absolute: item[valueKey], // Use the dynamic dataset key
      ltm: ltmValue,
      minmax: [minValue, maxValue]
    };
  });

  console.log("Combined Data:", combinedData);
  


  const startYear = year - 5;
  const endYear = year - 1;

  const getComparisonStatement = (monthIndex) => {
    const absItem = absolute[monthIndex];
    const ltmItem = ltm[monthIndex];
    const minItem = minData[monthIndex];
    const maxItem = maxData[monthIndex];

    if (!absItem || !ltmItem || !minItem || !maxItem || !datasetKey) return '';

    const obsValue = absItem[datasetKey] ?? 0;
    const ltmValue = ltmItem[datasetKey] ?? 0;
    const minValue = minItem[datasetKey] ?? 0;
    const maxValue = maxItem[datasetKey] ?? 0;

    let statement = `In ${monthNames[monthIndex]} ${year}, Observation ${dataset.toUpperCase()}: ${obsValue}, LTM: ${ltmValue}, 5-Year Min: ${minValue}, Max: ${maxValue}. `;

    if (obsValue > ltmValue) {
      statement += `The observed ${dataset.toUpperCase()} is higher than the long-term mean.`;
    } else if (obsValue < ltmValue) {
      statement += `The observed ${dataset.toUpperCase()} is lower than the long-term mean.`;
    } else {
      statement += `The observed ${dataset.toUpperCase()} equals the long-term mean.`;
    }

    if (obsValue > maxValue) {
      statement += ` and exceeds the 5-year maximum.`;
    } else if (obsValue < minValue) {
      statement += ` and falls below the 5-year minimum.`;
    } else {
      statement += ` and falls within the 5-year range.`;
    }

    return statement;
  };

  const analysisText = getComparisonStatement(selectedMonthIndex);

  return (
    <div className="analysis-top">
      {/* <h2>Monthly Mean Data Analysis</h2> */}
      <h3>{dataset} {year} {month}</h3>

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
        <>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={combinedData} margin={{ top: 20, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />

              {/* AreaChart for the RangeData (min-max range) */}
              <Area
                type="monotone"
                dataKey="minmax"
                stroke="gray"
                fill="gray"
                name="5-Year Min Max"
              />

              {/* LineChart for the absolute values */}
              <Line
                type="monotone"
                dataKey="absolute"
                stroke="#82ca9d"
                strokeWidth={1.5}
                dot={{ r: 2 }}
                name={`${year} Observed`}
              />

              {/* LineChart for the ltm values */}
              <Line
                type="monotone"
                dataKey="ltm"
                stroke="#8884d8"
                strokeWidth={1.5}
                dot={{ r: 2 }}
                name="Long Term Mean"
              />
            </ComposedChart>
          </ResponsiveContainer>

          <p className="chart-description">
            This chart compares current year <b>{year}</b> trends with the <b>5-year minimum-maximum range ({startYear} - {endYear})</b>,
            and the <b>20-year long-term mean (2001–2020)</b>, providing insight into variability 
            and deviations from historical patterns.
          </p>

          <p>{analysisText}</p>
        </>
      )}
    </div>
  );
}
