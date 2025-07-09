// components/modal/position/add
import React, { useState } from "react";
import BaseModal from "../../common/BaseModal";
import Swal from "sweetalert2";

export default function AddModal({ onClose, onSave }) {
  const [positionName, setPositionName] = useState("");
  const [baseSalary, setBaseSalary] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (positionName.trim() === "" || baseSalary.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Incomplete or Invalid Data",
        text: "Please fill in all fields correctly.",
      });
      return;
    }

    onSave({
      position_name: positionName.trim(),
      base_salary: baseSalary.trim(),
    });
  };

  return (
    <BaseModal
      title="Add New Position"
      onClose={onClose}
      footer={
        <>
          <button
            className="btn"
            style={{ backgroundColor: "#6c757d", color: "#fff" }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="btn"
            style={{ backgroundColor: "#107189", color: "#fff" }}
            onClick={handleSubmit}
          >
            Save
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-medium">Position Name</label>
          <input
            type="text"
            value={positionName}
            onChange={(e) => setPositionName(e.target.value)}
            className="form-control"
            placeholder="e.g. Backend Developer"
            style={{ border: "1px solid #ccc" }} 
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-medium">Base Salary</label>
          <input
            type="number"
            value={baseSalary}
            onChange={(e) => setBaseSalary(e.target.value)}
            className="form-control"
            placeholder="e.g. 5000000"
            style={{ border: "1px solid #ccc" }} 
          />
        </div>
      </form>
    </BaseModal>
  );
}
