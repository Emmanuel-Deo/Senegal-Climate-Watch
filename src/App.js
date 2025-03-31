import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import MenuPanel from './components/MenuPanel';
import MapCanvas from './components/MapCanvas';
import AnalysisPanel from './components/AnalysisPanel';
import { MapProvider } from './components/MapContext';
import ClimateData from './components/ClimateData';



function App() {
  return (
    <div className="App">

      <NavBar/>
      {/* <ClimateData/> */}
      
      <div className="container">
      
      <MenuPanel/>
      <MapProvider>
          <MapCanvas/>
          <AnalysisPanel/>
      </MapProvider>
      
      </div>

    </div>
  );
}

export default App;
