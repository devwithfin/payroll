// routers/app-route
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "../routers/ProtectedRoute";
import AppLayout from "../layouts/AppLayout";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/Profile";

// HR pages
import HRDashboard from "../pages/hr/Dashboard";
import HRPositions from "../pages/hr/Positions";
import HRDepartments from "../pages/hr/Departments";
import HREmployees from "../pages/hr/Employees";
import HRAttendances from "../pages/hr/Attendances";
import HRAllowanceType from "../pages/hr/AllowanceType";
import HRDeductionType from "../pages/hr/DeductionType";
import HROvertimeApproval from "../pages/hr/OvertimeApproval";
import HRPayrollDraft from "../pages/hr/PayrollDraft";
import HRSalarySlip from "../pages/hr/SalarySlip";
import HRAllowances from "../pages/hr/Allowances";
import HRDeductions from "../pages/hr/Deductions";

// Finance pages
import FinanceDashboard from "../pages/finance/Dashboard";
import FinancePayrollPeriod from "../pages/finance/PayrollPeriods";
import FinancePayrollProcess from "../pages/finance/PayrollProcess";
import FinanceSalarySlip from "../pages/finance/SalarySlip";

// Employee pages
import EmployeeDashboard from "../pages/employee/Dashboard";
import EmployeeAttendances from "../pages/employee/Attendances";
import EmployeeOvertimeRequest from "../pages/employee/OvertimeRequest";

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
          <Route path="/hr/allowance-type" element={<HRAllowanceType />} />
          <Route path="/hr/deduction-type" element={<HRDeductionType />} />
          <Route path="/hr/overtimes" element={<HROvertimeApproval />} />
          <Route path="/hr/payroll-draft" element={<HRPayrollDraft />} />
          <Route path="/hr/salary-slip" element={<HRSalarySlip />} />
          <Route path="/hr/allowances" element={<HRAllowances />} />
          <Route path="/hr/deductions" element={<HRDeductions />} />
          <Route path="/hr/profile" element={<ProfilePage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["Finance"]} />}>
        <Route element={<AppLayout key="finance-layout" />}>
          <Route path="/finance/dashboard" element={<FinanceDashboard />} />
          <Route
            path="/finance/payroll-periods"
            element={<FinancePayrollPeriod />}
          />
          <Route
            path="/finance/payroll-process"
            element={<FinancePayrollProcess />}
          />
          <Route path="/finance/salary-slip" element={<FinanceSalarySlip />} />
          <Route path="/finance/profile" element={<ProfilePage />} />
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
          <Route path="/employee/profile" element={<ProfilePage />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    <ToastContainer position="top-right" autoClose={2000} />
  </>
);

export default AppRoute;
