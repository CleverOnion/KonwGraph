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
import CollectionDetailPage from "../pages/user/CollectionDetailPage";
import SettingsPage from "../pages/user/SettingsPage";
import EditProfilePage from "../pages/user/EditProfilePage";
import NotificationsPage from "../pages/user/NotificationsPage";
import CategoryDetailPage from "../pages/user/CategoryDetailPage";
import TagDetailPage from "../pages/user/TagDetailPage";
import HotPage from "../pages/user/HotPage";
import ExplorePage from "../pages/user/ExplorePage";

// 管理页面
import DashboardPage from "../pages/admin/DashboardPage";
import AdminContentPage from "../pages/admin/AdminContentPage";
import AdminUserPage from "../pages/admin/AdminUserPage";
import AdminCategoryPage from "../pages/admin/AdminCategoryPage";
import AdminReportPage from "../pages/admin/AdminReportPage";
import AdminSettingsPage from "../pages/admin/AdminSettingsPage";
import AdminReviewPage from "../pages/admin/AdminReviewPage";

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
        path: "users/:userId",
        element: <UserProfilePage />,
      },
      {
        path: "users/:userId/edit",
        element: <EditProfilePage />,
      },
      {
        path: "collections/:collectionId",
        element: <CollectionDetailPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "settings/profile",
        element: <EditProfilePage />,
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
        path: "review",
        element: <AdminReviewPage />,
      },
      {
        path: "users",
        element: <AdminUserPage />,
      },
      {
        path: "categories",
        element: <AdminCategoryPage />,
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
];

const AppRouter = () => {
  return useRoutes(routes);
};

export default AppRouter;
