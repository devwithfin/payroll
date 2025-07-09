// layouts/app-layout
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

import SidebarHR from "../components/common/SidebarHR";
import SidebarEmployee from "../components/common/SidebarEmployee";
import SidebarFinance from "../components/common/SidebarFinance";
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
        backgroundColor: "#f8f9fa",
      }}
    >
      {/* Sidebar */}
      <div style={{ width: "220px" }}>{renderSidebar()}</div>

      {/* Main Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar />

        {/* Outlet Section */}
        <div
          style={{
            flex: 1,
            padding: "1.5rem",
            backgroundColor: "#ffffff",
            margin: "1rem",
            borderRadius: "0.5rem",
            boxShadow: "0 0 10px rgba(0,0,0,0.05)",
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
