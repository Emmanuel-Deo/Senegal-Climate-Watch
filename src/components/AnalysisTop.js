import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Original dataset
const rawData = {
    "Band_1": {
        "min": -1.0,
        "max": 0.8627167344093323,
        "mean": 0.27775132584370416,
        "count": 3122540,
        "std": 0.11072620677107418,
        "median": 0.25977057218551636
    },
    "Band_2": {
        "min": -0.9829059839248657,
        "max": 1.0,
        "mean": 0.4808869621664691,
        "count": 3122574,
        "std": 0.17823433800840663,
        "median": 0.4856659770011902
    },
    "Band_3": {
        "min": -1.0,
        "max": 1.0,
        "mean": 0.3705192829635797,
        "count": 3122575,
        "std": 0.16441569739327153,
        "median": 0.3241055905818939
    },
    "Band_4": {
        "min": -1.0,
        "max": 0.8610233068466187,
        "mean": 0.30489409326697,
        "count": 3122606,
        "std": 0.12017161893151225,
        "median": 0.28072088956832886
    },
    "Band_5": {
        "min": -0.9341249465942383,
        "max": 1.0,
        "mean": 0.23397332228273435,
        "count": 3122606,
        "std": 0.07685701083434818,
        "median": 0.22653621435165405
    },
    "Band_6": {
        "min": -0.9101123809814453,
        "max": 0.7951999306678772,
        "mean": 0.230870575937893,
        "count": 3122611,
        "std": 0.07156948664888606,
        "median": 0.22330741584300995
    },
    "Band_7": {
        "min": -0.5448673963546753,
        "max": 0.7291490435600281,
        "mean": 0.22074728624625795,
        "count": 3122612,
        "std": 0.07069997604131303,
        "median": 0.2067829966545105
    },
    "Band_8": {
        "min": -0.6849618554115295,
        "max": 0.7488736510276794,
        "mean": 0.22511916706270263,
        "count": 3122612,
        "std": 0.07711809274107384,
        "median": 0.20596662163734436
    },
    "Band_9": {
        "min": -0.9848484992980957,
        "max": 0.7714711427688599,
        "mean": 0.23786089659114745,
        "count": 3122605,
        "std": 0.0988985152954365,
        "median": 0.20188988745212555
    },
    "Band_10": {
        "min": -0.9809523820877075,
        "max": 0.8772101998329163,
        "mean": 0.37653725766234997,
        "count": 3122606,
        "std": 0.1814542979473781,
        "median": 0.3400720953941345
    },
    "Band_11": {
        "min": -0.9928057789802551,
        "max": 0.9226133227348328,
        "mean": 0.47003727192025085,
        "count": 3122592,
        "std": 0.15036508866804457,
        "median": 0.4776574373245239
    },
    "Band_12": {
        "min": -0.5759469866752625,
        "max": 0.913810670375824,
        "mean": 0.5511529854343048,
        "count": 3122611,
        "std": 0.1583370093581513,
        "median": 0.5911481380462646
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
