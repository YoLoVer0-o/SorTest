import "./App.css";
import Login from "./pages/LoginPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";

function App() {
  console.log("app started");

  return (
    <div className="tw-h-screen tw-w-screen">
      <Router basename={"/"}>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </Router>


    </div>
  )

}
export default App;
