import "./App.css";
import '@fontsource/noto-sans';
import '@fontsource-variable/noto-sans-thai';
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ConfigProvider } from "antd";

function App() {

  console.log("app started");

  return (
    <div className="tw-h-screen tw-w-full">
      <ConfigProvider
        theme={{
          token: { fontFamily: '"Noto Sans Thai Variable", "Noto Sans", sans serif' }
          ,
        }}
      >
        {/* <Router basename={"/"}>
          <Routes>
            <Route path="/" exact element={<LoginPage />} />
            <Route path="main" element={<MainPage />} >
              <Route index element={<LogTable />} />
              <Route path='overall' element={<Dashboard />} />
              <Route path='overall/feedback' element={<Feedback />} />
            </Route>
          </Routes>
        </Router> */}
        <RouterProvider router={router} />
      </ConfigProvider>
    </div>
  )

}
export default App;
