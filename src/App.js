// import logo from './logo.svg';
// import './App.css';
// import NavBar from './components/NavBar';
// import MenuPanel from './components/MenuPanel';
// import MapCanvas from './components/MapCanvas';
// import AnalysisPanel from './components/AnalysisPanel';
// import { MapProvider } from './components/MapContext';
// import ClimateData from './components/ClimateData';



// function App() {
//   return (
//     <div className="App">

//       <NavBar/>
//       {/* <ClimateData/> */}
      
//       <div className="container">
      
//       <MenuPanel/>
//       <MapProvider>
//           <MapCanvas/>
//           <AnalysisPanel/>
//       </MapProvider>
      
//       </div>

//     </div>
//   );
// }

// export default App;



import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import MapGallery from "./pages/MapGallery";
import Documentation from "./pages/Documentation";

function App() {
  return (
    <Router>
      <nav style={{ display: "flex", gap: "10px", padding: "10px" }}>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/map-gallery">Map Gallery</Link>
        <Link to="/documentation">Documentation</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/map-gallery" element={<MapGallery />} />
        <Route path="/documentation" element={<Documentation />} />
      </Routes>
    </Router>
  );
}

export default App;
