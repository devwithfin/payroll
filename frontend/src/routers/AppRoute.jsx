import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// protected-route
import ProtectedRoute from "./ProtectedRoute.jsx";
// login-page
import LoginPage from "../pages/LoginPage.jsx";
// layout
import AppLayout from "../layouts/AppLayout.jsx";

const AppRoute = () => (
  <Routes>
    {/* Public Route */}
    <Route path="/" element={<LoginPage />} />

    {/* ProtectedRoute */}
    <Route element={<ProtectedRoute/>}>
      <Route element={<AppLayout />}>
      {/* Dashboard */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Route>
    </Route>

    {/* Catch All */}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);


export default AppRoute;