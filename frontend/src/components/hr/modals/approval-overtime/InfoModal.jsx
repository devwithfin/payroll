//components/modals/approval-overtime/info-modal
import React, { useState } from "react";
import BaseModal from "../../../common/BaseModal";

export default function InfoModal({ data, employeeName, onClose }) {
  const [activeTab, setActiveTab] = useState("general");

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString("en-GB") : "-";

  const formatTime = (timeStr) => (timeStr ? timeStr.slice(0, 5) : "-");

  const formatCurrency = (value) =>
    value ? `Rp ${Number(value).toLocaleString("id-ID")}` : "-";

  const tabs = [
    { id: "general", label: "General Info" },
    { id: "time", label: "Time & Reason" },
    { id: "approval", label: "Approval Info" },
  ];

  return (
    <BaseModal
      title="Overtime Details"
      onClose={onClose}
      footer={
        <button className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
      }
    >
      {/* Tabs */}
      <ul className="nav nav-tabs mb-3" role="tablist">
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

      {/* Tab Content */}
      <div className="row g-3">
        {activeTab === "general" && (
          <>
            <InfoField label="Employee Name" value={employeeName} />
            <InfoField label="Request Date" value={formatDate(data?.request_date)} />
            <InfoField label="Overtime Date" value={formatDate(data?.overtime_date)} />
          </>
        )}

        {activeTab === "time" && (
          <>
            <InfoField label="Start Time" value={formatTime(data?.start_time)} />
            <InfoField label="End Time" value={formatTime(data?.end_time)} />
            <InfoField label="Reason" value={data?.reason} full />
          </>
        )}

        {activeTab === "approval" && (
          <>
            <InfoField label="Approval Date" value={formatDate(data?.approval_date_hrd)} />
            <InfoField label="Status" value={data?.approval_status} />
            <InfoField label="Approval Notes" value={data?.notes_approval} full />
            <InfoField label="Overtime Amount" value={formatCurrency(data?.calculation?.overtime_amount)} />
          </>
        )}
      </div>
    </BaseModal>
  );
}

function InfoField({ label, value, full = false }) {
  return (
    <div className={full ? "col-12" : "col-md-6"}>
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
