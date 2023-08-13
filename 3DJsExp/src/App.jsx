import { useState } from 'react'

import './App.css'
import * as d3 from "d3";
import LinePlot from '../components/LinePlot'
import BarChart from '../components/Bar';


function App() {
  
  const [data, setData] = useState(() => d3.ticks(-2, 2, 200).map(Math.sin));

  function onMouseMove(event) {
    const [x, y] = d3.pointer(event);
    setData(data.slice(-200).concat(Math.atan2(x, y)));
  }
  return (
    <>
     <div>
      <div onMouseMove={onMouseMove}>
      <LinePlot data={data} />
      </div>
      <BarChart />
    </div>
    </>
  )
}

export default App
