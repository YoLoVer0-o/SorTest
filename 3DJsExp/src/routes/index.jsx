import { createBrowserRouter } from "react-router-dom";
import { Dashboard, PostTable, PostReport, CreatePost, SentimentTable, SentimentReport, AccountTable } from "../components";
import { LoginPage, MainPage, PostDataPage, CreatePostPage, SentimentPage, RPAManagementPage } from "../pages";

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
        path: "/sentiment/report",
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
        element: <SentimentReport />,
      },
      {
        path: "/RPA/job/:platform",
        element: <SentimentReport />,
      },
      {
        path: "/RPA/errlog/:platform",
        element: <SentimentReport />,
      },
      {
        path: "/RPA/activlog/:platform",
        element: <SentimentReport />,
      },
    ],
  },

]);
