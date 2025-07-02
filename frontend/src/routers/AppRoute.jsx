import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import protected route
import ProtectedRoute from "./ProtectedRoute.jsx";
// import login page
import LoginPage from "../pages/LoginPage.jsx";
//import layout
import AppLayout from "../layouts/AppLayout.jsx";

const AppRoute = () => (
  <Routes>
    {/* public route */}
    <Route path="/" element={<LoginPage />} />

    {/* protected route */}
    <Route element={<ProtectedRoute/>}>
      <Route element={<AppLayout />}>
      {/* dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Route>

    {/* catch all */}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);


export default AppRoute;