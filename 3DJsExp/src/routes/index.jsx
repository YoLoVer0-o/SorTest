import { createBrowserRouter } from "react-router-dom";
import { Dashboard, PostTable, PostReport, CreatePost, SentimentTable, SentimentReport, AccountTable, SchedueTable, WorkTable, DataLog, ClassTable, WordTable } from "../components";
import { LoginPage, MainPage, PostDataPage, CreatePostPage, SentimentPage, RPAManagementPage, ClassConfigPage } from "../pages";

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
        element: <Dashboard />,
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
  },
  {
    path: "/createPost",
    element: <CreatePostPage />,
    children: [
      {
        path: "",
        element: <CreatePost />,
      },
    ],
  },
  {
    path: "/sentiment",
    element: <SentimentPage />,
    children: [
      {
        path: "",
        element: <SentimentTable />,
      },
      {
        path: "/sentiment/report/:id",
        element: <SentimentReport />,
      },
    ],
  },
  {
    path: "/RPA",
    element: <RPAManagementPage />,
    children: [
      {
        path: "/RPA/account/:platform",
        element: <AccountTable />,
      },
      {
        path: "/RPA/fulltime/:platform",
        element: <SchedueTable />,
      },
      {
        path: "/RPA/job/:platform",
        element: <WorkTable />,
      },
      {
        path: "/RPA/errlog/:platform",
        element: <DataLog dataType={"error"} />,
      },
      {
        path: "/RPA/activlog/:platform",
        element: <DataLog dataType={"active"} />,
      },
    ],
  },
  {
    path: "/classconfig",
    element: <ClassConfigPage />,
    children: [
      {
        path: "",
        element: <ClassTable />,
      },
      {
        path: "/classconfig/edit/:cat_id",
        element: <WordTable />,
      },
    ],
  },

]);
