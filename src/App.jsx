import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { Suspense, useEffect } from "react";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import ProtectedRoute from "./components/ProtectedRoute";
const PageNotFound = React.lazy(() => import("./Pages/PageNotFound/Index"));

const Public = React.lazy(() => import("./Pages/Public/Index"));
const PrivateRouting = React.lazy(() => import("./Pages/PrivateRouting/Index"));
const Dashboard = React.lazy(() => import("./Pages/Dashboard/index"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="text-center mt-10">
          <LoadingOutlined />
        </div>
      }
    >
      <Routes>
        <Route path="/*" element={<Public />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'branch_head', 'doctor']}>
              <PrivateRouting />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'branch_head', 'doctor']}>
              <PrivateRouting />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/superadmin" 
          element={
            <ProtectedRoute allowedRoles={['super_admin']}>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/patient-portal" 
          element={
            <ProtectedRoute allowedRoles={['patient', 'user']}>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Suspense>
  );
}

export default App;
