import "./App.css";
import '@fontsource/noto-sans';
import '@fontsource-variable/noto-sans-thai';
import Login from "./pages/LoginPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import { ConfigProvider } from "antd";

function App() {
  console.log("app started");

  return (
    <div className="tw-h-screen tw-w-screen">
      <ConfigProvider
        theme={{
          token: { fontFamily: '"Noto Sans Thai Variable", "Noto Sans", sans serif' }
          ,
        }}
      >
        <Router basename={"/"}>
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/main" element={<MainPage />} />
          </Routes>
        </Router>
      </ConfigProvider>


    </div>
  )

}
export default App;
