// components/common/sidebar-hr
import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faHome,
  faUserTie,
  faUser,
  faMoneyCheckDollar,
  faMoneyBill,
  faFileInvoiceDollar,
  faCalendarCheck,
  faClock,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";

const SidebarHR = () => {
  const sidebarRef = useRef(null);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        .nav-link {
          color: #495057;
          font-size: 13px;
          padding: 10px 16px;
          border-radius: 0.375rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s ease;
        }
        .nav-link:hover {
          background-color: rgba(16, 113, 185, 0.1);
          color: #1071B9;
        }
        .nav-link.active {
          background-color: #1071B9 !important;
          color: #fff !important;
        }
        .sidebar-scroll::-webkit-scrollbar {
          width: 0px;
        }
        .sidebar-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .section-title {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #adb5bd;
          margin: 12px 0 4px 12px;
        }
        .logo-container {
          padding-top: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: none !important;
        }
        .logo-title {
          color: #1071B9;
          letter-spacing: 0.1em;
          font-weight: 700;
          font-size: 1.25rem;
        }
      `}</style>

      <div
        ref={sidebarRef}
        className="position-fixed sidebar-scroll"
        style={{
          width: "220px",
          height: "100vh",
          top: 0,
          left: 0,
          zIndex: 1030,
          backgroundColor: "#fff",
          borderRight: "none",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <div className="text-center logo-container">
          <Link
            to="/hr/dashboard"
            className="text-decoration-none d-flex gap-2 align-items-center justify-content-center"
          >
            <img
              src="/images/logo.png"
              alt="HRIS Logo"
              style={{ width: "2rem", height: "2rem", borderRadius: "50%" }}
            />
            <span className="logo-title">HRIS</span>
          </Link>
        </div>

        <ul className="nav flex-column px-3 py-3">
          <div className="section-title">Main</div>
          <li className="nav-item mb-2">
            <Link
              to="/hr/dashboard"
              className={`nav-link fw-medium ${
                isActive("/hr/dashboard") ? "active" : ""
              }`}
            >
              <FontAwesomeIcon icon={faHome} />
              Dashboard
            </Link>
          </li>

          <div className="section-title">Organization</div>
           <li className="nav-item mb-2">
            <Link
              to="/hr/departments"
              className={`nav-link fw-medium ${
                isActive("/hr/departments") ? "active" : ""
              }`}
            >
              <FontAwesomeIcon icon={faBuilding} />
              Departments
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link
              to="/hr/positions"
              className={`nav-link fw-medium ${
                isActive("/hr/positions") ? "active" : ""
              }`}
            >
              <FontAwesomeIcon icon={faBuilding} />
              Positions
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link
              to="/hr/employees"
              className={`nav-link fw-medium ${
                isActive("/hr/employees") ? "active" : ""
              }`}
            >
              <FontAwesomeIcon icon={faUserTie} />
              Employees
            </Link>
          </li>

          <div className="section-title">Attendance</div>
          <li className="nav-item mb-2">
            <Link
              to="/hr/attendances"
              className={`nav-link fw-medium ${
                isActive("/hr/attendances") ? "active" : ""
              }`}
            >
              <FontAwesomeIcon icon={faCalendarCheck} />
              Attendances
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link
              to="/hr/overtimes"
              className={`nav-link fw-medium ${
                isActive("/hr/overtimes") ? "active" : ""
              }`}
            >
              <FontAwesomeIcon icon={faClock} />
              Overtime
            </Link>
          </li>

          <div className="section-title">Compensation</div>
          <li className="nav-item mb-2">
            <Link
              to="/hr/allowances"
              className={`nav-link fw-medium ${
                isActive("/hr/allowances") ? "active" : ""
              }`}
            >
              <FontAwesomeIcon icon={faMoneyBill} />
              Allowances
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link
              to="/hr/deductions"
              className={`nav-link fw-medium ${
                isActive("/hr/deductions") ? "active" : ""
              }`}
            >
              <FontAwesomeIcon icon={faFileInvoiceDollar} />
              Deductions
            </Link>
          </li>

          <div className="section-title">Payroll</div>
          <li className="nav-item mb-2">
            <Link
              to="/hr/salary"
              className={`nav-link fw-medium ${
                isActive("/hr/salary") ? "active" : ""
              }`}
            >
              <FontAwesomeIcon icon={faMoneyCheckDollar} />
              Salary Slip
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link
              to="/hr/payroll/process"
              className={`nav-link fw-medium ${
                isActive("/hr/payroll/process") ? "active" : ""
              }`}
            >
              <FontAwesomeIcon icon={faMoneyBillWave} />
              Process Payroll
            </Link>
          </li>

          <div className="section-title">Account</div>
          <li className="nav-item mb-2">
            <Link
              to="/hr/profile"
              className={`nav-link fw-medium ${
                isActive("/hr/profile") ? "active" : ""
              }`}
            >
              <FontAwesomeIcon icon={faUser} />
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SidebarHR;
