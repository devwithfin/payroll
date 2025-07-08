import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoute from '../routers/ProtectedRoute';
import AppLayout from '../layouts/AppLayout';
import LoginPage from '../pages/LoginPage';

import HRDashboard from '../pages/hr/Dashboard';
import FinanceDashboard from '../pages/finance/Dashboard';
import EmployeeDashboard from '../pages/employee/Dashboard';

const AppRoute = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} />

    {/* Human Resources Route */}
    <Route element={<ProtectedRoute allowedRoles={['HR']} />}>
      <Route element={<AppLayout />}>
        <Route path="/hr/dashboard" element={<HRDashboard />} />
      </Route>
    </Route>

    {/* Finance Route */}
    <Route element={<ProtectedRoute allowedRoles={['Finance']} />}>
      <Route element={<AppLayout />}>
        <Route path="/finance/dashboard" element={<FinanceDashboard />} />
      </Route>
    </Route>

    {/* Employee Route */}
    <Route element={<ProtectedRoute allowedRoles={['Employee']} />}>
      <Route element={<AppLayout />}>
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
      </Route>
    </Route>

    {/* Catch All */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoute;
