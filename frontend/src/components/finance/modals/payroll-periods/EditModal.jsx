import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import BaseModal from "../../../common/BaseModal";

export default function EditModal({ period, onClose, onSave }) {
  const [periodName, setPeriodName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [payrollDate, setPayrollDate] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (period) {
      setPeriodName(period.period_name || "");
      setStartDate(period.start_date || "");
      setEndDate(period.end_date || "");
      setPayrollDate(period.payroll_date || "");
      setStatus(period.status || "");
    }
  }, [period]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!periodName || !startDate || !endDate || !payrollDate || !status) {
      Swal.fire("Error", "Please fill in all fields", "error");
      return;
    }

    onSave({
      id: period.period_id,
      period_name: periodName,
      start_date: startDate,
      end_date: endDate,
      payroll_date: payrollDate,
      status,
    });
  };

  return (
    <BaseModal
      title="Edit Payroll Period"
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Update
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Period Name</label>
          <input
            type="text"
            className="form-control"
            value={periodName}
            onChange={(e) => setPeriodName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">End Date</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Payroll Date</label>
          <input
            type="date"
            className="form-control"
            value={payrollDate}
            onChange={(e) => setPayrollDate(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </form>
    </BaseModal>
  );
}
