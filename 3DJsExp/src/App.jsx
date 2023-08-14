import "./App.css";
import { bankData } from "./assets/MOCK_DATA";
import Pie from "./components/Pie";

function App() {
  console.log("app started");


  return (
    <div>
      <div>
        <Pie
          data={bankData}
          width={200}
          height={200}
          innerRadius={60}
          outerRadius={100}
        />
      </div>
    </div>
  )

}
export default App;
