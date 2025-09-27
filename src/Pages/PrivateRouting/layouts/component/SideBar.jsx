import React from "react";
import { Menu, Layout } from "antd";
import {
  AppstoreOutlined,
  StarOutlined,
  LogoutOutlined,
  HomeOutlined,
  ContainerOutlined,
  DashboardOutlined,
  SettingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Map current path → active key
  const getSelectedKey = () => {
    if (location.pathname.includes("/admin/service")) return "services";
    if (location.pathname.includes("/admin/reviews")) return "reviews";
    if (location.pathname.includes("/admin/homeMedia")) return "homeMedia";
    if (location.pathname.includes("/admin/brand")) return "brand";
    if (location.pathname.includes("/admin/contact")) return "contact";
    if (location.pathname.includes("/admin/logo")) return "logos";
    if (location.pathname.includes("/admin/bannerMedia")) return "bannerMedia";
    return "";
  };

  const selectedKey = getSelectedKey();

  return (
    <Sider collapsible>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        style={{ height: "100%" }}
      >
        <Menu.Item
          key="services"
          icon={<AppstoreOutlined />}
          onClick={() => navigate("/admin/service")}
          style={
            selectedKey === "services"
              ? {
                  backgroundColor: "#1677ff",
                  color: "#fff",
                  fontWeight: "bold",
                  borderRadius: 6,
                }
              : {}
          }
        >
          Services
        </Menu.Item>

        <Menu.Item
          key="reviews"
          icon={<StarOutlined />}
          onClick={() => navigate("/admin/reviews")}
          style={
            selectedKey === "reviews"
              ? {
                  backgroundColor: "#1677ff",
                  color: "#fff",
                  fontWeight: "bold",
                  borderRadius: 6,
                }
              : {}
          }
        >
          Reviews
        </Menu.Item>

        <Menu.Item
          key="contact"
          icon={<ContainerOutlined />}
          onClick={() => navigate("/admin/contact")}
          style={
            selectedKey === "contact"
              ? {
                  backgroundColor: "#1677ff",
                  color: "#fff",
                  fontWeight: "bold",
                  borderRadius: 6,
                }
              : {}
          }
        >
          Contact
        </Menu.Item>

        <Menu.Item
          key="homeMedia"
          icon={<HomeOutlined />}
          onClick={() => navigate("/admin/homeMedia")}
          style={
            selectedKey === "homeMedia"
              ? {
                  backgroundColor: "#1677ff",
                  color: "#fff",
                  fontWeight: "bold",
                  borderRadius: 6,
                }
              : {}
          }
        >
          HomeMedia
        </Menu.Item>

        <Menu.Item
          key="bannerMedia"
          icon={<UploadOutlined />}
          onClick={() => navigate("/admin/bannerMedia")}
          style={
            selectedKey === "bannerMedia"
              ? {
                  backgroundColor: "#1677ff",
                  color: "#fff",
                  fontWeight: "bold",
                  borderRadius: 6,
                }
              : {}
          }
        >
          BannerMedia
        </Menu.Item>

        <Menu.Item
          key="logos"
          icon={<AppstoreOutlined />}
          onClick={() => navigate("/admin/logo")}
          style={
            selectedKey === "logos"
              ? {
                  backgroundColor: "#1677ff",
                  color: "#fff",
                  fontWeight: "bold",
                  borderRadius: 6,
                }
              : {}
          }
        >
          Logos
        </Menu.Item>

        <Menu.Item
          key="brand"
          icon={<DashboardOutlined />}
          onClick={() => navigate("/admin/brand")}
          style={
            selectedKey === "brand"
              ? {
                  backgroundColor: "#1677ff",
                  color: "#fff",
                  fontWeight: "bold",
                  borderRadius: 6,
                }
              : {}
          }
        >
          Channel Partners
        </Menu.Item>

        <Menu.Item
          key="logout"
          icon={<LogoutOutlined />}
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
          style={
            selectedKey === "logout"
              ? {
                  backgroundColor: "red",
                  color: "#fff",
                  fontWeight: "bold",
                  borderRadius: 6,
                }
              : {}
          }
        >
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default SideBar;
