import React from "react";
import { Layout } from "antd";
import SideBar from "./component/SideBar";
import TopHeader from "./component/Header"; // renamed to avoid conflict

function Index({ children }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar />
      <Layout>
        <TopHeader pageTitle="Dashboard" />
        <div style={{ padding: 20 }}>{children}</div>
      </Layout>
    </Layout>
  );
}

export default Index;
