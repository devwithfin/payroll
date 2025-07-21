// layouts/AppLayout.jsx
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

import SidebarHR from "../components/hr/SidebarHR";
import SidebarEmployee from "../components/employee/SidebarEmployee";
import SidebarFinance from "../components/finance/SidebarFinance";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const AppLayout = () => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  const renderSidebar = () => {
    switch (user?.role?.toLowerCase()) {
      case "hr":
        return <SidebarHR />;
      case "employee":
        return <SidebarEmployee />;
      case "finance":
        return <SidebarFinance />;
      default:
        return null;
    }
  };

  return (
    <div
      key={user?.role}
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f1f3f5", 
      }}
    >
      {/* Sidebar */}
      <div style={{ width: "220px", backgroundColor: "#fff", boxShadow: "1px 0 5px rgba(0,0,0,0.05)" }}>
        {renderSidebar()}
      </div>

      {/* Main Section */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar />

        {/* Page Content */}
        <div
          style={{
            flex: 1,
            margin: "1rem",
            padding: "1.5rem",
            backgroundColor: "#ffffff",
            borderRadius: "0.5rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            overflow: "auto",
          }}
        >
          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
