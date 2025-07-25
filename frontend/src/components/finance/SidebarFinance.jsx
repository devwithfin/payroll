// components/sidebar-finance
import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faMoneyBillWave,
  faCalendarAlt,
  faUser,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const SidebarFinance = () => {
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
        {/* Logo */}
        <div className="text-center logo-container">
          <Link
            to="/finance/dashboard"
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
              to="/finance/dashboard"
              className={`nav-link fw-medium ${
                isActive("/finance/dashboard") ? "active" : ""
              }`}
            >
              <FontAwesomeIcon icon={faHome} />
              Dashboard
            </Link>
          </li>

          <div className="section-title">Monitoring</div>
          <li className="nav-item mb-2">
            <Link
              to="/finance/attendances"
              className={`nav-link fw-medium ${
                isActive("/finance/attendances") ? "active" : ""
              }`}
            >
              <FontAwesomeIcon icon={faClock} />
              Attendances
            </Link>
          </li>

          <div className="section-title">Payroll</div>
          <li className="nav-item mb-2">
            <Link
              to="/finance/payroll-periods"
              className={`nav-link fw-medium ${
                isActive("/finance/payroll/periods") ? "active" : ""
              }`}
            >
              <FontAwesomeIcon icon={faCalendarAlt} />
              Payroll Periods
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link
              to="/finance/payroll-process"
              className={`nav-link fw-medium ${
                isActive("/finance/payroll/process") ? "active" : ""
              }`}
            >
              <FontAwesomeIcon icon={faMoneyBillWave} />
               FInal Payroll
            </Link>
          </li>
          <div className="section-title">Account</div>
          <li className="nav-item mb-2">
            <Link
              to="/finance/profile"
              className={`nav-link fw-medium ${
                isActive("/finance/profile") ? "active" : ""
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

export default SidebarFinance;
