import React, { useEffect } from "react";
import { Suspense } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Review from "./review/index";
import Service from "./service/index";
import Contact from "./contact/Index";
import ScrollToTop from "../../Component/ScrollToTop";
import HomeSectionMedia from "./HomeMedia/Index";
import BannerMedia from "./BannerMedia/Index";
import LogoTable from "./ClientLogo/Index";
import PartnerLogo from "./Partner/Index";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuthStore } from "../../store/useAuthStore";

const Index = () => {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate("/login");
    }
  }, [isAuthenticated, user, navigate]);
  return (
    <>
      <ScrollToTop />
      <Suspense
        fallback={
          <div className="text-center mt-10">
            <LoadingOutlined />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={
            <DashboardLayout>
              <div className="text-center p-8">
                <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
                <p>Welcome to the admin panel. Use the sidebar to navigate.</p>
              </div>
            </DashboardLayout>
          } />
          <Route path="/service" element={<DashboardLayout><Service /></DashboardLayout>} />
          <Route path="/logo" element={<DashboardLayout><LogoTable /></DashboardLayout>} />
          <Route path="/reviews" element={<DashboardLayout><Review /></DashboardLayout>} />
          <Route path="/contact" element={<DashboardLayout><Contact /></DashboardLayout>} />
          <Route path="/brand" element={<DashboardLayout><PartnerLogo /></DashboardLayout>} />
          <Route path="/homeMedia" element={<DashboardLayout><HomeSectionMedia /></DashboardLayout>} />
          <Route path="/bannerMedia" element={<DashboardLayout><BannerMedia /></DashboardLayout>} />
        </Routes>
      </Suspense>
    </>
  );
};
export default Index;
