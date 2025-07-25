import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faClock,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";

export default function SummaryCard({ title, value }) {
  // Tentukan ikon & warna berdasarkan judul
  const getIcon = () => {
    if (title.includes("Attendance")) {
      return { icon: faCalendarCheck, color: "#4caf50" }; // Green
    }
    if (title.includes("Overtime")) {
      return { icon: faClock, color: "#ff9800" }; // Orange
    }
    if (title.includes("Salary")) {
      return { icon: faMoneyBillWave, color: "#2196f3" }; // Blue
    }
    return { icon: faCalendarCheck, color: "#9e9e9e" }; // Default gray
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
