import { useRoutes } from "react-router-dom";

// 布局组件
import MainLayout from "../components/MainLayout";
import AdminLayout from "../components/AdminLayout";

// 用户页面
import HomePage from "../pages/user/HomePage";
import LoginPage from "../pages/user/LoginPage";
import RegisterPage from "../pages/user/RegisterPage";
import PostDetailPage from "../pages/user/PostDetailPage";
import EditorPage from "../pages/user/EditorPage";
import SearchResultPage from "../pages/user/SearchResultPage";
import UserProfilePage from "../pages/user/UserProfilePage";
import SettingsPage from "../pages/user/SettingsPage";
import NotificationsPage from "../pages/user/NotificationsPage";
import CategoryDetailPage from "../pages/user/CategoryDetailPage";
import TagDetailPage from "../pages/user/TagDetailPage";
import HotPage from "../pages/user/HotPage";
import ExplorePage from "../pages/user/ExplorePage";

// 管理页面
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import DashboardPage from "../pages/admin/DashboardPage";
import AdminContentPage from "../pages/admin/AdminContentPage";
import AdminUserPage from "../pages/admin/AdminUserPage";
import AdminReportPage from "../pages/admin/AdminReportPage";
import AdminSettingsPage from "../pages/admin/AdminSettingsPage";

const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/hot",
    element: <HotPage />,
  },
  {
    path: "/explore",
    element: <ExplorePage />,
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/editor", element: <EditorPage /> },
  // 其他用户端路由
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        path: "post/:id",
        element: <PostDetailPage />,
      },
      {
        path: "editor/:id",
        element: <EditorPage />,
      },
      {
        path: "search",
        element: <SearchResultPage />,
      },
      {
        path: "user/:id",
        element: <UserProfilePage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "notifications",
        element: <NotificationsPage />,
      },
      {
        path: "category/:id",
        element: <CategoryDetailPage />,
      },
      {
        path: "tag/:id",
        element: <TagDetailPage />,
      },
    ],
  },
  // 管理端路由
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "content",
        element: <AdminContentPage />,
      },
      {
        path: "users",
        element: <AdminUserPage />,
      },
      {
        path: "reports",
        element: <AdminReportPage />,
      },
      {
        path: "settings",
        element: <AdminSettingsPage />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLoginPage />,
  },
];

const AppRouter = () => {
  return useRoutes(routes);
};

export default AppRouter;
