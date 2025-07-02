// components/common/sidebar
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

// Import fontawesome icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faFile,
  faHome,
  faCog,
  faAngleDown,
  faAngleRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const sidebarRef = useRef(null); 
  const location = useLocation(); // get current path location
  const [openMasterData, setOpenMasterData] = useState(false); // toggle expand master data
  const [openTransactions, setOpenTransactions] = useState(false); // toggle expand transactions

  // active path dropdown
  const isActive = (path) => location.pathname === path;

  // toggle menu master data
  const toggleMenuMasterData = (e) => {
    e.stopPropagation();
    setOpenMasterData(!openMasterData);
    setOpenTransactions(false);
  };

  // toggle menu transactions
  const toggleMenuTransactions = (e) => {
    e.stopPropagation();
    setOpenTransactions(!openTransactions);
    setOpenMasterData(false);
  };

  // close dropdown whhen click outside sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpenMasterData(false);
        setOpenTransactions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* inline styling CSS for sidebar */}
      <style>{`
        .nav-link {
          color: rgba(255, 255, 255, 0.5);
          transition: color 0.3s ease;
        }
        .nav-link:hover,
        .nav-link.active {
          color: #fff !important;
        }
        .nav-link svg {
          transition: color 0.3s ease;
          color: inherit;
          width: 20px;
        }
        .submenu {
          background: #fff;
          margin-left: 1rem;
          border-radius: 0.25rem;
        }
        .submenu a {
          color: #343a40 !important;
          font-size: 13px;
          padding: 6px 12px;
          display: block;
          text-decoration: none;
        }
        .submenu a:hover {
          background-color: rgba(0, 0, 0, 0.05);
          color: #000 !important;
        }
      `}</style>

      <div
        ref={sidebarRef}
        className="text-white position-fixed"
        style={{
          backgroundColor: "#4E73DF",
          width: "225px",
          height: "100vh",
          top: 0,
          left: 0,
          zIndex: 1030,
        }}
      >
        {/* logo sidebar */}
        <div className="text-center py-4 fw-bold">
          <Link
            to="/dashboard"
            className="text-white text-decoration-none d-flex gap-1 align-items-center justify-content-center"
          >
            <span>Title Page</span>
            <FontAwesomeIcon icon={faBuilding} size="2x" />
          </Link>
        </div>

        <hr className="mx-3" style={{ borderColor: "rgba(255, 255, 255, 0.8)", marginTop: "0.5rem" }} />

        {/* menu list */}
        <ul className="nav flex-column px-1 py-3">
          {/* dashboard */}
          <li className="nav-item mb-2">
            <Link
              to="/dashboard"
              className={`nav-link fw-medium d-flex align-items-center gap-2 ${isActive("/dashboard") ? "active" : ""}`}
              style={{ fontSize: "14px" }}
            >
              <FontAwesomeIcon icon={faHome} />
              <span>Dashboard</span>
            </Link>
          </li>

          {/* menu master data */}
          <li className="nav-item mb-2">
            <div
              className={`nav-link fw-medium d-flex align-items-center justify-content-between`}
              onClick={toggleMenuMasterData}
              style={{ fontSize: "14px", cursor: "pointer" }}
            >
              <div className="d-flex align-items-center gap-2">
                <FontAwesomeIcon icon={faCog} />
                <span>Master Data</span>
              </div>
              <FontAwesomeIcon icon={openMasterData ? faAngleDown : faAngleRight} />
            </div>

            {openMasterData && (
              <div className="submenu shadow-sm mt-1 py-2 px-3">
                <Link to="master/categories" className={`d-block py-1 ${isActive("master/categories") ? "fw-bold text-dark" : "text-muted"}`}>
                  Categories
                </Link>
                <Link to="master/products" className={`d-block py-1 ${isActive("master/products") ? "fw-bold text-dark" : "text-muted"}`}>
                  Products
                </Link>
                <Link to="master/suppliers" className={`d-block py-1 ${isActive("master/suppliers") ? "fw-bold text-dark" : "text-muted"}`}>
                  Suppliers
                </Link>
                <Link to="master/customers" className={`d-block py-1 ${isActive("master/customers") ? "fw-bold text-dark" : "text-muted"}`}>
                  Customers
                </Link>
                <Link to="master/roles" className={`d-block py-1 ${isActive("master/roles") ? "fw-bold text-dark" : "text-muted"}`}>
                  Roles
                </Link>
                <Link to="master/users" className={`d-block py-1 ${isActive("master/users") ? "fw-bold text-dark" : "text-muted"}`}>
                  Users
                </Link>
              </div>
            )}
          </li>

          {/* menu transactions */}
          <li className="nav-item mb-2">
            <div
              className={`nav-link fw-medium d-flex align-items-center justify-content-between`}
              onClick={toggleMenuTransactions}
              style={{ fontSize: "14px", cursor: "pointer" }}
            >
              <div className="d-flex align-items-center gap-2">
                <FontAwesomeIcon icon={faFile} />
                <span>Transactions</span>
              </div>
              <FontAwesomeIcon icon={openTransactions ? faAngleDown : faAngleRight} />
            </div>

            {openTransactions && (
              <div className="submenu shadow-sm mt-1 py-2 px-3">
                <Link to="transactions/purchase" className={`d-block py-1 ${isActive("/ransactions/purchase") ? "fw-bold text-dark" : "text-muted"}`}>
                  Purchase
                </Link>
                <Link to="transactions/purchases/history" className={`d-block py-1 ${isActive("transactions/purchases/history") ? "fw-bold text-dark" : "text-muted"}`}>
                  History Purchases
                </Link>
                <Link to="transactions/sale" className={`d-block py-1 ${isActive("transactions/sale") ? "fw-bold text-dark" : "text-muted"}`}>
                  Sale
                </Link>
                <Link to="transactions/sales/history" className={`d-block py-1 ${isActive("transactions/sales/history") ? "fw-bold text-dark" : "text-muted"}`}>
                  History Sales
                </Link>
                <Link to="transactions/inventory" className={`d-block py-1 ${isActive("transactions/inventory") ? "fw-bold text-dark" : "text-muted"}`}>
                  Inventory
                </Link>
              </div>
            )}
          </li>

          {/* menu archived */}
          <li className="nav-item mb-2">
            <Link
              to="/archived"
              className={`nav-link fw-medium d-flex align-items-center gap-2 ${isActive("/archived") ? "active" : ""}`}
              style={{ fontSize: "14px" }}
            >
              <FontAwesomeIcon icon={faTrash} />
              <span>Archived</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
