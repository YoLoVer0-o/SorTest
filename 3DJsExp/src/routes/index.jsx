import { createBrowserRouter } from "react-router-dom";
import { Dashboard, Feedback, LogTable, PostTable, PostReport } from "../components";
import { LoginPage, MainPage, PostDataPage } from "../pages";


export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "",
    element: <MainPage />,
    children: [
      {
        path: "/main",
        element: <LogTable />,
      },
      {
        path: "/main/overall",
        element: <Dashboard />,
      },
      {
        path: "/main/overall/feedback",
        element: <Feedback />,
      },
    ],
  },
  {
    path: "/postlog",
    element: <PostDataPage />,
    children: [
      {
        path: "",
        element: <PostTable />,
      },
      {
        path: "/postlog/report",
        element: <PostReport />,
      },
    ],
  }

]);
