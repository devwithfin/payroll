import { useRef, useState } from "react";
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
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const SidebarHR = () => {
  const sidebarRef = useRef(null);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const [openSection, setOpenSection] = useState({
    management: true,
    time: true,
    settings: true,
    compensation: true,
    payroll: true,
    account: true,
  });

  const toggleSection = (section) => {
    setOpenSection((prev) => ({ ...prev, [section]: !prev[section] }));
  };

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
        .toggle-header {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #adb5bd;
          margin: 12px 0 4px 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
        }
        .sidebar-scroll::-webkit-scrollbar {
          width: 0px;
        }
        .sidebar-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .logo-container {
          padding-top: 1.5rem;
          padding-bottom: 1rem;
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
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {/* Logo */}
        <div className="text-center logo-container border-bottom">
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
          {/* Main */}
          <div className="toggle-header">Main</div>
          <li className="nav-item mb-2">
            <Link
              to="/hr/dashboard"
              className={`nav-link fw-medium ${isActive("/hr/dashboard") ? "active" : ""}`}
            >
              <FontAwesomeIcon icon={faHome} />
              Dashboard
            </Link>
          </li>

          {/* Management */}
          <div className="toggle-header" onClick={() => toggleSection("management")}>
            <span>Management</span>
            <FontAwesomeIcon icon={openSection.management ? faChevronDown : faChevronRight} />
          </div>
          {openSection.management && (
            <>
              <li className="nav-item mb-2">
                <Link
                  to="/hr/departments"
                  className={`nav-link fw-medium ${isActive("/hr/departments") ? "active" : ""}`}
                >
                  <FontAwesomeIcon icon={faBuilding} />
                  Departments
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/hr/positions"
                  className={`nav-link fw-medium ${isActive("/hr/positions") ? "active" : ""}`}
                >
                  <FontAwesomeIcon icon={faBuilding} />
                  Positions
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/hr/employees"
                  className={`nav-link fw-medium ${isActive("/hr/employees") ? "active" : ""}`}
                >
                  <FontAwesomeIcon icon={faUserTie} />
                  Employees
                </Link>
              </li>
            </>
          )}

          {/* Time Management */}
          <div className="toggle-header" onClick={() => toggleSection("time")}>
            <span>Time Management</span>
            <FontAwesomeIcon icon={openSection.time ? faChevronDown : faChevronRight} />
          </div>
          {openSection.time && (
            <>
              <li className="nav-item mb-2">
                <Link
                  to="/hr/attendances"
                  className={`nav-link fw-medium ${isActive("/hr/attendances") ? "active" : ""}`}
                >
                  <FontAwesomeIcon icon={faCalendarCheck} />
                  Attendances
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/hr/overtimes"
                  className={`nav-link fw-medium ${isActive("/hr/overtimes") ? "active" : ""}`}
                >
                  <FontAwesomeIcon icon={faClock} />
                  Approval Overtime
                </Link>
              </li>
            </>
          )}

          {/* Settings */}
          <div className="toggle-header" onClick={() => toggleSection("settings")}>
            <span>Settings</span>
            <FontAwesomeIcon icon={openSection.settings ? faChevronDown : faChevronRight} />
          </div>
          {openSection.settings && (
            <>
              <li className="nav-item mb-2">
                <Link
                  to="/hr/allowance-types"
                  className={`nav-link fw-medium ${isActive("/hr/allowance-types") ? "active" : ""}`}
                >
                  <FontAwesomeIcon icon={faMoneyBill} />
                  Allowance Types
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/hr/deduction-types"
                  className={`nav-link fw-medium ${isActive("/hr/deduction-types") ? "active" : ""}`}
                >
                  <FontAwesomeIcon icon={faFileInvoiceDollar} />
                  Deduction Types
                </Link>
              </li>
            </>
          )}

          {/* Compensation */}
          <div className="toggle-header" onClick={() => toggleSection("compensation")}>
            <span>Compensation</span>
            <FontAwesomeIcon icon={openSection.compensation ? faChevronDown : faChevronRight} />
          </div>
          {openSection.compensation && (
            <>
              <li className="nav-item mb-2">
                <Link
                  to="/hr/allowances"
                  className={`nav-link fw-medium ${isActive("/hr/allowances") ? "active" : ""}`}
                >
                  <FontAwesomeIcon icon={faMoneyBill} />
                  Allowances
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/hr/deductions"
                  className={`nav-link fw-medium ${isActive("/hr/deductions") ? "active" : ""}`}
                >
                  <FontAwesomeIcon icon={faFileInvoiceDollar} />
                  Deductions
                </Link>
              </li>
            </>
          )}

          {/* Payroll */}
          <div className="toggle-header" onClick={() => toggleSection("payroll")}>
            <span>Payroll</span>
            <FontAwesomeIcon icon={openSection.payroll ? faChevronDown : faChevronRight} />
          </div>
          {openSection.payroll && (
            <>
              <li className="nav-item mb-2">
                <Link
                  to="/hr/payroll-draft"
                  className={`nav-link fw-medium ${isActive("/hr/payroll-draft") ? "active" : ""}`}
                >
                  <FontAwesomeIcon icon={faMoneyBillWave} />
                  Draft Payroll
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/hr/salary-slip"
                  className={`nav-link fw-medium ${isActive("/hr/salary-slip") ? "active" : ""}`}
                >
                  <FontAwesomeIcon icon={faMoneyCheckDollar} />
                  Salary Slip
                </Link>
              </li>
            </>
          )}

          {/* Account */}
          <div className="toggle-header" onClick={() => toggleSection("account")}>
            <span>Account</span>
            <FontAwesomeIcon icon={openSection.account ? faChevronDown : faChevronRight} />
          </div>
          {openSection.account && (
            <li className="nav-item mb-2">
              <Link
                to="/hr/profile"
                className={`nav-link fw-medium ${isActive("/hr/profile") ? "active" : ""}`}
              >
                <FontAwesomeIcon icon={faUser} />
                Profile
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default SidebarHR;
