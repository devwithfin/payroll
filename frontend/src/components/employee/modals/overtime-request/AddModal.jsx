// components/modals/deduction-type/add-modal
import React, { useState } from "react";
import BaseModal from "../../../common/BaseModal";
import Swal from "sweetalert2";

export default function AddModal({ employeeId, onClose, onSave }) {
  const [overtimeDate, setOvertimeDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!overtimeDate || !startTime || !endTime || !reason.trim()) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Data",
        text: "Please fill in all required fields",
      });
      return;
    }

    if (startTime >= endTime) {
      Swal.fire({
        icon: "error",
        title: "Invalid Time",
        text: "End time must be after start time",
      });
      return;
    }

    const selectedDate = new Date(overtimeDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      Swal.fire({
        icon: "error",
        title: "Invalid Date",
        text: "Overtime date cannot be in the past",
      });
      return;
    }

    const newData = {
      employee_id: employeeId,
      overtime_date: overtimeDate,
      start_time: `${startTime}:00`,
      end_time: `${endTime}:00`,
      reason: reason.trim(),
      submitted_by: employeeId,
    };

    onSave(newData);
  };

  return (
    <BaseModal
      title="Add New Overtime Request"
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn"
            style={{ backgroundColor: "#107189", color: "#fff" }}
            onClick={handleSubmit}
          >
            Submit Request
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <input type="hidden" value={employeeId} />
        <input type="hidden" value={employeeId} />

        <div className="mb-3">
          <label className="form-label">
            Overtime Date <span className="text-danger">*</span>
          </label>
          <input
            type="date"
            className="form-control"
            value={overtimeDate}
            onChange={(e) => setOvertimeDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            required
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">
              Start Time <span className="text-danger">*</span>
            </label>
            <input
              type="time"
              className="form-control"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">
              End Time <span className="text-danger">*</span>
            </label>
            <input
              type="time"
              className="form-control"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">
            Reason <span className="text-danger">*</span>
          </label>
          <textarea
            className="form-control"
            rows="3"
            placeholder="Please provide a reason for overtime request"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            maxLength="500"
            required
          />
          <div className="form-text">{reason.length}/500 characters</div>
        </div>

        <div className="alert alert-info">
          <small>
            <strong>Note:</strong> Your overtime request will be submitted for approval. 
            You will be notified once it's reviewed by HR.
          </small>
        </div>
      </form>
    </BaseModal>
  );
}