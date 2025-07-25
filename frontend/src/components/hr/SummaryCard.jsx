import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faBuilding,
  faBriefcase,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

export default function SummaryCard({ title, value }) {
  const getIcon = () => {
    if (title.includes("Employee")) {
      return { icon: faUsers, color: "#1071B9" };
    }
    if (title.includes("Department")) {
      return { icon: faBuilding, color: "#28a745" };
    }
    if (title.includes("Position")) {
      return { icon: faBriefcase, color: "#ffc107" };
    }
    if (title.includes("Pending")) {
      return { icon: faClock, color: "#dc3545" };
    }
    return { icon: faUsers, color: "#6c757d" };
  };

  const { icon, color } = getIcon();

  return (
    <div
      className="card border-0 shadow-sm h-100"
      style={{ borderRadius: "1rem", background: "#f9f9fc" }}
    >
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <p className="text-muted fw-semibold mb-1" style={{ fontSize: "0.85rem" }}>
            {title}
          </p>
          <h3 className="fw-bold mb-0">{value}</h3>
        </div>
        <div>
          <FontAwesomeIcon icon={icon} size="2x" style={{ color }} />
        </div>
      </div>
    </div>
  );
}