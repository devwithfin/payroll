// routers/approute
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "../routers/ProtectedRoute";
import AppLayout from "../layouts/AppLayout";
import LoginPage from "../pages/LoginPage";

// HR pages
import HRDashboard from "../pages/hr/Dashboard";
import HRPositions from "../pages/hr/Positions";
import HRDepartments from "../pages/hr/Departments";
import HREmployees from "../pages/hr/Employees";
import HRAttendances from "../pages/hr/Attendances";
import HROvertimeApproval from "../pages/hr/OvertimeApproval";
import HRAllowances from "../pages/hr/Allowances";
import HRDeductions from "../pages/hr/Deductions";
import HRProfile from "../pages/hr/Profile";

// Finance pages
import FinanceDashboard from "../pages/finance/Dashboard";

// Employee pages
import EmployeeDashboard from "../pages/employee/Dashboard";
import EmployeeAttendances from "../pages/employee/Attendances";
import EmployeeOvertimeRequest from "../pages/employee/OvertimeRequest";
import EmployeeProfile from "../pages/employee/Profile";

const AppRoute = () => (
  <>
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route element={<ProtectedRoute allowedRoles={["HR"]} />}>
        <Route element={<AppLayout key="hr-layout" />}>
          <Route path="/hr/dashboard" element={<HRDashboard />} />
          <Route path="/hr/positions" element={<HRPositions />} />
          <Route path="/hr/departments" element={<HRDepartments />} />
          <Route path="/hr/employees" element={<HREmployees />} />
          <Route path="/hr/attendances" element={<HRAttendances />} />
          <Route path="/hr/overtimes" element={<HROvertimeApproval />} />
          <Route path="/hr/allowances" element={<HRAllowances />} />
          <Route path="/hr/deductions" element={<HRDeductions />} />
          <Route path="/hr/profile" element={<HRProfile />} />
          {/* route lain */}
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["Finance"]} />}>
        <Route element={<AppLayout key="finance-layout" />}>
          <Route path="/finance/dashboard" element={<FinanceDashboard />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["Employee"]} />}>
        <Route element={<AppLayout key="employee-layout" />}>
          <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
          <Route
            path="/employee/attendances"
            element={<EmployeeAttendances />}
          />
          <Route
            path="/employee/overtimes"
            element={<EmployeeOvertimeRequest />}
          />
          <Route path="/employee/profile" element={<EmployeeProfile />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    <ToastContainer position="top-right" autoClose={2000} />
  </>
);

export default AppRoute;
