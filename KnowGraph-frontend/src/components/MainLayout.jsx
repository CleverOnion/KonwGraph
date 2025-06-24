import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const { Content, Footer } = Layout;

const MainLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "0 50px", marginTop: "24px" }}>
        <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        KnowGraph ©{new Date().getFullYear()} Created by CleverOnion
      </Footer>
    </Layout>
  );
};

export default MainLayout;
