import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import MenuPanel from './components/MenuPanel';
import MapCanvas from './components/MapCanvas';
import AnalysisPanel from './components/AnalysisPanel';


function App() {
  return (
    <div className="App">
      
      <NavBar/>
      
      <div className="container">
      
      <MenuPanel/>
      <MapCanvas/>
      <AnalysisPanel/>
      </div>
      {/* <BasicMap/>
      <NDVIChart/> */}
    </div>
  );
}

export default App;
