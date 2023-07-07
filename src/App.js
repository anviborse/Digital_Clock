import './App.css';
import DigitalClock from './DigitalClock';
import WorldClock from "./WorldClock";
import AlarmClock from "./AlarmClock";
import StopWatch from "./StopWatch";
import Timer from "./Timer";
import NavBar from './NavBar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path ="/" element={<DigitalClock/>}/>
          <Route path ="/worldclock" element={<WorldClock/>}/> 
          <Route path ="/alarmclock" element={<AlarmClock/>}/>
          <Route path ="/stopwatch" element={<StopWatch/>}/>
          <Route path ="/timer" element={<Timer/>}/>
          <Route element={<DigitalClock/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

