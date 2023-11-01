import { createBrowserRouter } from "react-router-dom";
import { Dashboard, Feedback, LogTable, PostTable, PostReport, CreatePost, SentimentTable, SentimentReport } from "../components";
import { LoginPage, MainPage, PostDataPage, CreatePostPage, SentimentPage } from "../pages";


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

]);
