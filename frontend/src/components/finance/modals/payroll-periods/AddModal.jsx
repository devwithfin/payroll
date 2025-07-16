import React, { useState } from "react";
import BaseModal from "../../../common/BaseModal";
import Swal from "sweetalert2";

export default function AddModal({ onClose, onSave }) {
  const [periodName, setPeriodName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [payrollDate, setPayrollDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!periodName || !startDate || !endDate || !payrollDate) {
      Swal.fire("Error", "Please fill in all fields", "error");
      return;
    }

    onSave({
      period_name: periodName,
      start_date: startDate,
      end_date: endDate,
      payroll_date: payrollDate,
    });
  };

  return (
    <BaseModal
      title="Add Payroll Period"
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Save
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-medium">Period Name</label>
          <input
            type="text"
            value={periodName}
            onChange={(e) => setPeriodName(e.target.value)}
            className="form-control"
            placeholder="e.g. January 2025"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-medium">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-medium">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-medium">Payroll Date</label>
          <input
            type="date"
            value={payrollDate}
            onChange={(e) => setPayrollDate(e.target.value)}
            className="form-control"
          />
        </div>
      </form>
    </BaseModal>
  );
}
