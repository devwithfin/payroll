import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignOutAlt,
  faBell,
  faEnvelope,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useAuthContext } from "../../contexts/AuthContext";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { handleLogout } = useAuth();
  const { user } = useAuthContext();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const pageTitles = {
    "/hr/dashboard": "HR Dashboard",
    "/hr/positions": "Position Management",
    "/hr/departments": "Department Management",
    "/hr/employees": "Employee Management",
    "/hr/attendances": "Attendance & Recapitulation",
    "/hr/allowances": "Employee Allowance",
    "/hr/deductions": "Employee Deduction",
    "/hr/allowance-type": "Allowance Type",
    "/hr/deduction-type": "Deduction Type",
    "/hr/overtimes": "Overtime Approval",
    "/hr/overtime-rates": "Overtime Rates",
    "/hr/payroll-draft": "Payroll Draft",
    "/hr/salary-slip": "Salary Slip",
    "/hr/profile": "HR Profile",
    "/hr/account-activation": "Account Activation",

    "/finance/dashboard": "Finance Dashboard",
    "/finance/attendances": "Finance Attendance",
    "/finance/payroll-periods": "Payroll Periods",
    "/finance/payroll-process": "Payroll Process",
    "/finance/salary-slip": "Salary Slip",
    "/finance/profile": "Finance Profile",

    "/employee/dashboard": "Employee Dashboard",
    "/employee/attendances": "Employee Attendance",
    "/employee/overtimes": "Request Overtime",
    "/employee/profile": "Employee Profile",
  };

  const pageTitle = pageTitles[location.pathname];
  const fullName = user?.employee?.full_name || user?.username || "-";
  const email = user?.employee?.email || "-";

  return (
    <nav
      className="navbar py-3"
      style={{
        backgroundColor: "#F9FBFD",
        position: "sticky",
        top: 0,
        zIndex: 900,
        width: "100%",
      }}
    >
      <div className="container-fluid px-4 d-flex justify-content-between align-items-center">
        <h6 className="m-0 fw-semibold" style={{ fontSize: "20px", color: "#212529" }}>
          {pageTitle}
        </h6>

        <div className="d-flex align-items-center gap-3">
          <input
            type="text"
            placeholder="Search for..."
            className="form-control form-control-sm"
            style={{
              width: "220px",
              fontSize: "13px",
              padding: "8px 12px",
              backgroundColor: "#ffffff",
              borderRadius: "0.375rem",
            }}
          />

          <FontAwesomeIcon icon={faEnvelope} style={{ color: "#ADB5BD" }} />
          <FontAwesomeIcon icon={faBell} style={{ color: "#ADB5BD" }} />

          <div
            style={{
              height: "32px",
              borderLeft: "1px solid #dee2e6",
              margin: "0 12px",
            }}
          />

          <div className="position-relative" ref={dropdownRef}>
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="d-flex gap-2 align-items-center cursor-pointer"
              style={{ userSelect: "none" }}
            >
              <img
                src="/images/logo.png"
                alt="User"
                style={{ width: "2rem", height: "2rem", borderRadius: "50%" }}
              />
              <div className="d-flex flex-column text-end me-1">
                <span className="fw-semibold" style={{ fontSize: "13px" }}>
                  {fullName}
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    style={{
                      fontSize: "12px",
                      marginLeft: "6px",
                      transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s",
                    }}
                  />
                </span>
                <span className="text-muted" style={{ fontSize: "12px" }}>
                  {email}
                </span>
              </div>
            </div>

            {dropdownOpen && (
              <ul
                className="dropdown-menu dropdown-menu-end shadow show"
                style={{
                  display: "block",
                  position: "absolute",
                  top: "calc(100% + 10px)",
                  right: 0,
                  minWidth: "180px",
                  fontSize: "13px",
                  backgroundColor: "#fff",
                  zIndex: 999,
                  border: "1px solid #dee2e6",
                  borderRadius: "0.375rem",
                  padding: "0.5rem 0",
                }}
              >
                <li>
                  <Link
                    to={`/${user?.role?.toLowerCase()}/profile`}
                    onClick={() => setDropdownOpen(false)}
                    className="dropdown-item d-flex align-items-center gap-2"
                    style={{
                      backgroundColor: location.pathname.includes("/profile") ? "#1071B9" : "transparent",
                      color: location.pathname.includes("/profile") ? "#fff" : "#212529",
                    }}
                  >
                    <FontAwesomeIcon icon={faUser} />
                    Profile
                  </Link>
                </li>

                <li>
                  <button
                    type="button"
                    className="dropdown-item d-flex align-items-center gap-2"
                    onClick={() => {
                      setDropdownOpen(false);
                      handleLogout();
                    }}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
