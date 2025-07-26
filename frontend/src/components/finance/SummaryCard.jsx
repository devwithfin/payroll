// components/finance/summary-card
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBillWave,
  faCheckCircle,
  faEnvelopeOpenText,
  faFileInvoiceDollar,
} from "@fortawesome/free-solid-svg-icons";

export default function SummaryCard({ title, value, smallValue }) {
  const getIcon = () => {
    if (title.includes("Total Payroll")) {
      return { icon: faMoneyBillWave, color: "#28a745" }; 
    }
    if (title.includes("Payroll Status")) {
      return { icon: faCheckCircle, color: "#007bff" }; 
    }
    if (title.includes("Payslips Sent")) {
      return { icon: faEnvelopeOpenText, color: "#fd7e14" }; 
    }
    if (title.includes("Invoice") || title.includes("Summary")) {
      return { icon: faFileInvoiceDollar, color: "#6f42c1" }; 
    }
    return { icon: faMoneyBillWave, color: "#6c757d" };
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
          <h4 className="fw-bold mb-0">
            {value}
            {smallValue && (
              <small style={{ fontSize: "0.75rem", marginLeft: "4px" }}>{smallValue}</small>
            )}
          </h4>
        </div>
        <div>
          <FontAwesomeIcon icon={icon} size="2x" style={{ color }} />
        </div>
      </div>
    </div>
  );
}
