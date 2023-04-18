import SideMenu from "../../components/SideMenu";
import TopHeader from "../../components/TopHeader";
import React from "react";
// import "./index.css";
import { Outlet } from "react-router-dom";

import { Layout } from "antd";
const { Content } = Layout;

export default function News() {
  return (
    <Layout>
      <SideMenu />
      <Layout className="site-layout">
        <TopHeader />
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            backgroundColor: "white",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
