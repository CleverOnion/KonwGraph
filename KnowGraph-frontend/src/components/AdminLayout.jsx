import React from "react";
import { Outlet } from "react-router-dom";

// 这是一个简化的后台布局，将来可以扩展为包含侧边栏导航的复杂布局
const AdminLayout = () => {
  return (
    <div>
      <h1>后台管理</h1>
      <hr />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
