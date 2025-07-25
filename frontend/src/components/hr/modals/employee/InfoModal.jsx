// components/hr/modals/employee/info-modal
import React, { useState } from "react";
import BaseModal from "../../../common/BaseModal";

export default function InfoModal({ employee, onClose }) {
  const [activeTab, setActiveTab] = useState("personal");

  if (!employee) return null;

  const parseGender = (g) => {
    if (!g) return "-";
    return g === "M" ? "Man" : g === "W" ? "Woman" : "-";
  };

  const parseMaritalStatus = (ptkp) => {
    if (!ptkp) return "-";
    return ptkp.startsWith("K") ? "Married" : "Single";
  };

  const parseDependents = (ptkp) => {
    if (!ptkp) return "-";
    const num = ptkp.match(/\d+/);
    return num ? `${num[0]} Dependents` : "0";
  };

  const tabs = [
    { id: "personal", label: "Personal Info" },
    { id: "contact", label: "Contact Info" },
    { id: "job", label: "Job Info" },
    { id: "bank", label: "Bank Info" },
  ];

  return (
    <BaseModal
      title="Employee Details"
      onClose={onClose}
      footer={
        <button className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
      }
    >
      <ul
        className="nav nav-tabs mb-3"
        role="tablist"
        style={{ borderBottom: "1px solid #dee2e6" }}
      >
        {tabs.map((tab) => (
          <li className="nav-item" key={tab.id} role="presentation">
            <button
              className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              style={{ cursor: "pointer" }}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      <div
        className="tab-content"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
        }}
      >
        {activeTab === "personal" && (
          <>
            <InfoField label="Full Name" value={employee.full_name} />
            <InfoField label="NIK" value={employee.employee_nik} />
            <InfoField label="Birth Date" value={employee.dob} />
            <InfoField label="Gender" value={parseGender(employee.gender)} />
            <InfoField
              label="Marital Status"
              value={parseMaritalStatus(employee.pt_kp)}
            />
            <InfoField
              label="Number of Dependents"
              value={parseDependents(employee.pt_kp)}
            />
            <InfoField label="Address" value={employee.address} />
          </>
        )}

        {activeTab === "contact" && (
          <>
            <InfoField label="Phone Number" value={employee.phone_number} />
            <InfoField label="Email" value={employee.email} />
          </>
        )}

        {activeTab === "job" && (
          <>
            <InfoField label="Department" value={employee.department_name} />
            <InfoField label="Position" value={employee.position_name} />
            <InfoField
              label="Employment Status"
              value={employee.employment_status}
            />
            <InfoField label="Join Date" value={employee.join_date} />
            <InfoField label="NPWP Number" value={employee.npwp_number} />
            <InfoField label="Role" value={employee.role} />
          </>
        )}

        {activeTab === "bank" && (
          <>
            <InfoField label="Bank Name" value={employee.bank_name} />
            <InfoField
              label="Account Number"
              value={employee.bank_account_number}
            />
          </>
        )}
      </div>
    </BaseModal>
  );
}

function InfoField({ label, value }) {
  return (
    <div>
      <label
        className="fw-semibold text-muted"
        style={{ display: "block", marginBottom: "0.25rem" }}
      >
        {label}
      </label>
      <div
        className="form-control bg-light border"
        style={{
          minHeight: "38px",
          paddingTop: "6px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        title={value}
      >
        {value || "-"}
      </div>
    </div>
  );
}
