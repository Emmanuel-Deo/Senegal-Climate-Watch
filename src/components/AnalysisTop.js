import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Original dataset
const rawData = {
  "Band_1": {
      "min": 0.0,
      "max": 0.5084298849105835,
      "mean": 0.059009829287640043,
      "count": 1417,
      "std": 0.10544319335075249,
      "median": 0.0
  },
  "Band_2": {
      "min": 0.0,
      "max": 0.4037192165851593,
      "mean": 0.1641896529860621,
      "count": 1417,
      "std": 0.11521420527954454,
      "median": 0.1925792396068573
  },
  "Band_3": {
      "min": 0.3671707808971405,
      "max": 4.649876594543457,
      "mean": 3.0205415821277346,
      "count": 1417,
      "std": 0.6422545505251921,
      "median": 3.0763328075408936
  },
  "Band_4": {
      "min": 1.035589575767517,
      "max": 6.481156349182129,
      "mean": 3.63973044945307,
      "count": 1417,
      "std": 1.351367631155703,
      "median": 3.5591676235198975
  },
  "Band_5": {
      "min": 0.0,
      "max": 13.233498573303223,
      "mean": 3.0434997601667253,
      "count": 1417,
      "std": 3.474748708552291,
      "median": 1.4794704914093018
  },
  "Band_6": {
      "min": 0.0,
      "max": 5.578964710235596,
      "mean": 0.9400860470789961,
      "count": 1417,
      "std": 1.4358001547454184,
      "median": 0.0
  },
  "Band_7": {
      "min": 0.0,
      "max": 3.5153555870056152,
      "mean": 1.002340097366796,
      "count": 1417,
      "std": 0.954191757813758,
      "median": 0.7910183668136597
  },
  "Band_8": {
      "min": 0.0,
      "max": 1.9973714351654053,
      "mean": 0.306446858838821,
      "count": 1417,
      "std": 0.4042400480514197,
      "median": 0.0
  },
  "Band_9": {
      "min": 0.0,
      "max": 1.5069124698638916,
      "mean": 0.3986724659684854,
      "count": 1417,
      "std": 0.3362642137055242,
      "median": 0.3793123960494995
  },
  "Band_10": {
      "min": 0.0,
      "max": 1.5705246925354004,
      "mean": 0.6094372842878881,
      "count": 1417,
      "std": 0.2774982503337256,
      "median": 0.5485414266586304
  },
  "Band_11": {
      "min": 0.927822470664978,
      "max": 5.055576801300049,
      "mean": 2.8346004984121382,
      "count": 1417,
      "std": 0.7879010089785372,
      "median": 2.9378180503845215
  },
  "Band_12": {
      "min": 0.2129073292016983,
      "max": 2.4271175861358643,
      "mean": 0.8017808998985533,
      "count": 1417,
      "std": 0.42788644899531475,
      "median": 0.6918140649795532
  }
}
// LTM dataset
const ltmData = {
  "Band_1": {
      "min": 0.0,
      "max": 0.5914610624313354,
      "mean": 0.25380789165187234,
      "count": 1417,
      "std": 0.0997210753942825,
      "median": 0.24346844851970673
  },
  "Band_2": {
      "min": 0.002379422541707754,
      "max": 0.3682838976383209,
      "mean": 0.13574095990511423,
      "count": 1417,
      "std": 0.07563290661154398,
      "median": 0.1213814988732338
  },
  "Band_3": {
      "min": 0.2810261845588684,
      "max": 2.0229015350341797,
      "mean": 1.1619369086869267,
      "count": 1417,
      "std": 0.22427680267189334,
      "median": 1.1399301290512085
  },
  "Band_4": {
      "min": 0.8248294591903687,
      "max": 5.395063877105713,
      "mean": 3.2784360940808046,
      "count": 1417,
      "std": 1.0518231593432557,
      "median": 3.3169021606445312
  },
  "Band_5": {
      "min": 0.014870136976242065,
      "max": 10.405176162719727,
      "mean": 2.2591336505381086,
      "count": 1417,
      "std": 2.7695245072907877,
      "median": 0.9325309991836548
  },
  "Band_6": {
      "min": 0.0,
      "max": 4.283750534057617,
      "mean": 0.8359738540380205,
      "count": 1417,
      "std": 1.1922879866966547,
      "median": 0.04909477382898331
  },
  "Band_7": {
      "min": 0.0,
      "max": 2.0932109355926514,
      "mean": 0.6666660349219301,
      "count": 1417,
      "std": 0.6635787242662329,
      "median": 0.4989807605743408
  },
  "Band_8": {
      "min": 0.0,
      "max": 1.2930208444595337,
      "mean": 0.27678108080727326,
      "count": 1417,
      "std": 0.32022370320669546,
      "median": 0.08010311424732208
  },
  "Band_9": {
      "min": 0.0,
      "max": 1.1500134468078613,
      "mean": 0.5086182760536124,
      "count": 1417,
      "std": 0.36297148720730876,
      "median": 0.5578603744506836
  },
  "Band_10": {
      "min": 0.2789113521575928,
      "max": 3.4964938163757324,
      "mean": 1.7534562180222302,
      "count": 1417,
      "std": 0.6841968672718863,
      "median": 1.8462049961090088
  },
  "Band_11": {
      "min": 0.8642786145210266,
      "max": 6.946932792663574,
      "mean": 4.758934134064043,
      "count": 1417,
      "std": 1.079251766481573,
      "median": 5.0684099197387695
  },
  "Band_12": {
      "min": 0.38924503326416016,
      "max": 2.7671685218811035,
      "mean": 1.5925193038218948,
      "count": 1417,
      "std": 0.5415955677832583,
      "median": 1.5421607494354248
  }
};

// Map Band_1 to Jan, Band_2 to Feb, ..., Band_12 to Dec
const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

// Convert raw and LTM data into an array format for Recharts
const data = Object.keys(rawData).map((band, index) => ({
    name: monthNames[index],  
    mean: rawData[band].mean,
    meanLTM: ltmData[band].mean
}));

export default function AnalysisTop() {
  return (
    <div className="analysis-top">
      <h2>Monthly Mean Data Analysis</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 50, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fontFamily: "Arial", fill: "#333" }} />
          <YAxis label={{ value: "Mean Values", angle: -90, position: "Left", fontSize: 12, fontWeight: "bold" }} />
          <Tooltip />
          <Legend />

          {/* Mean Lines */}
          <Line type="monotone" dataKey="mean" stroke="#3385FF" strokeWidth={2} dot={{ r: 3 }} name="Mean (Raw)" />
          <Line type="monotone" dataKey="meanLTM" stroke="#FF5733" strokeWidth={2} dot={{ r: 3 }} name="Mean (LTM)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
