import React, { useEffect } from "react";
import { Suspense } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./LandingPage/Index";
const PageNotFound = React.lazy(() => import("../PageNotFound/Index"));
import PageLoader from "../../Component/PageLoader";

const LoginPage = React.lazy(() => import("./LoginPage/index"));
const UnauthorizedPage = React.lazy(() => import("./Unauthorized/index"));

import ScrollToTop from "../../Component/ScrollToTop";

const Index = () => {
 
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
          <Route path="*" element={<PageNotFound />} /> {/* Catch-all 404 */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
        </Routes>
      </Suspense>
    </>
  );
};
export default Index;
