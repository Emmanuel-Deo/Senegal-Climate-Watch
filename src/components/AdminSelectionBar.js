import React, { useState, useEffect } from "react";

export default function AdminSelectionBar({ geoJsonData, onSelectionChange }) {
  const [adm1Options, setAdm1Options] = useState([]);
  const [adm2Options, setAdm2Options] = useState([]);
  const [adm3Options, setAdm3Options] = useState([]);

  const [selectedAdm1, setSelectedAdm1] = useState("");
  const [selectedAdm2, setSelectedAdm2] = useState("");
  const [selectedAdm3, setSelectedAdm3] = useState("");

  useEffect(() => {
    if (geoJsonData) {
      const adm1Set = new Set();
      geoJsonData.features.forEach(feature => {
        adm1Set.add(feature.properties.ADM1_FR);
      });
      setAdm1Options(Array.from(adm1Set).sort());
    }
  }, [geoJsonData]);

  useEffect(() => {
    if (!geoJsonData || !selectedAdm1) {
      setAdm2Options([]);
      setSelectedAdm2("");
      setAdm3Options([]);
      setSelectedAdm3("");
      return;
    }

    const adm2Set = new Set();
    geoJsonData.features.forEach(feature => {
      if (feature.properties.ADM1_FR === selectedAdm1) {
        adm2Set.add(feature.properties.ADM2_FR);
      }
    });
    setAdm2Options(Array.from(adm2Set).sort());
    setSelectedAdm2("");
    setAdm3Options([]);
    setSelectedAdm3("");
  }, [geoJsonData, selectedAdm1]);

  useEffect(() => {
    if (!geoJsonData || !selectedAdm1 || !selectedAdm2) {
      setAdm3Options([]);
      setSelectedAdm3("");
      return;
    }

    const adm3Set = new Set();
    geoJsonData.features.forEach(feature => {
      if (
        feature.properties.ADM1_FR === selectedAdm1 &&
        feature.properties.ADM2_FR === selectedAdm2
      ) {
        adm3Set.add(feature.properties.ADM3_FR);
      }
    });
    setAdm3Options(Array.from(adm3Set).sort());
    setSelectedAdm3("");
  }, [geoJsonData, selectedAdm1, selectedAdm2]);

  useEffect(() => {
    onSelectionChange({ adm1: selectedAdm1, adm2: selectedAdm2, adm3: selectedAdm3 });
  }, [selectedAdm1, selectedAdm2, selectedAdm3, onSelectionChange]);

  return (
    <div style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
      <select value={selectedAdm1} onChange={e => setSelectedAdm1(e.target.value)}>
        <option value="">-- Select ADM1 --</option>
        {adm1Options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>

      <select
        value={selectedAdm2}
        onChange={e => setSelectedAdm2(e.target.value)}
        disabled={!adm2Options.length}
      >
        <option value="">-- Select ADM2 --</option>
        {adm2Options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>

      <select
        value={selectedAdm3}
        onChange={e => setSelectedAdm3(e.target.value)}
        disabled={!adm3Options.length}
      >
        <option value="">-- Select ADM3 --</option>
        {adm3Options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
