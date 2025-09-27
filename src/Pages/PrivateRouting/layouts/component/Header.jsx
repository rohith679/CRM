import React from "react";
import { Layout, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

function TopHeader({ pageTitle }) {
  return (
    <Header
      style={{
        background: "#fff",
        padding: "0 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* <h2 style={{ margin: 0 }}>{pageTitle}</h2>
      <Space>
        <UserOutlined />
        <span>Admin</span>
      </Space> */}
    </Header>
  );
}

export default TopHeader;
