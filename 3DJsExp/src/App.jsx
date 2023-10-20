import "./App.css";
import '@fontsource/noto-sans';
import '@fontsource-variable/noto-sans-thai';
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ConfigProvider } from "antd";

function App() {

  console.log("app started");

  return (
    <div className="tw-h-screen tw-w-screen">
      <ConfigProvider
        theme={{
          token: { fontFamily: '"Noto Sans Thai Variable", "Noto Sans", sans serif' },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </div>
  )

}
export default App;
