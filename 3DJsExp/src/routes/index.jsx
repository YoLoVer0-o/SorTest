import { createBrowserRouter } from "react-router-dom";
import {
  Dashboard,
  SubDashboard,
  PostTable,
  PostReport,
  CreatePost,
  SentimentTable,
  SentimentReport,
  AccountTable,
  SchedueTable,
  WorkTable,
  DataLog,
  ClassTable,
  WordTable,
  SimilarPost,
  Trending,
  StatusTable,
  CreateGroupPost,
  UserManageTable,
  SeoWebSite,
  AccountInfomation,
} from "../components";
import {
  LoginPage,
  MainPage,
  PostDataPage,
  CreatePostPage,
  SentimentPage,
  RPAManagementPage,
  ClassConfigPage,
  RecommendationPage,
  UserManagementPage,
  SeoWebSitePage,
  AccountManagePage,
} from "../pages";

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
        path: "/main/overall",
        element: <Dashboard />,
      },
      {
        path: "/main/:topic",
        element: <SubDashboard />,
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
    path: "/postCreation",
    element: <CreatePostPage />,
    children: [
      {
        path: "/postCreation/createPost",
        element: <CreatePost />,
      },
      {
        path: "/postCreation/createGroupPost",
        element: <CreateGroupPost />,
      },
      {
        path: "/postCreation/postStatus",
        element: <StatusTable />,
      },
    ],
  },
  {
    path: "/account",
    element: <AccountManagePage />,
    children: [
      {
        path: "/account/manage",
        element: <AccountInfomation />,
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
        path: "/classconfig/edit/:category_name",
        element: <WordTable />,
      },
    ],
  },
  {
    path: "/recommendation",
    element: <RecommendationPage />,
    children: [
      {
        path: "/recommendation/similarpost",
        element: <SimilarPost />,
      },
      {
        path: "/recommendation/trending",
        element: <Trending />,
      },
    ],
  },
  {
    path: "/admin",
    element: <UserManagementPage />,
    children: [
      {
        path: "/admin/usermanagement",
        element: <UserManageTable />,
      },
    ],
  },

  {
    path: "/seowebsite",
    element: <SeoWebSitePage />,
    children: [
      {
        path: "",
        element: <SeoWebSite />,
      }
    ]
  },
]);
