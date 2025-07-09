// components/modal/position/edit
import React, { useState, useEffect } from "react";
import BaseModal from "../../common/BaseModal";
import Swal from "sweetalert2";

export default function EditModal({ position, onClose, onSave }) {
  const [positionName, setPositionName] = useState("");
  const [baseSalary, setBaseSalary] = useState("");

  useEffect(() => {
    if (position) {
      setPositionName(position.position_name || "");
      setBaseSalary(position.base_salary || "");
    }
  }, [position]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (positionName.trim() === "" || baseSalary.toString().trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Incomplete or Invalid Data",
        text: "Please fill in all fields correctly.",
      });
      return;
    }

    onSave({
      id: position.position_id,
      position_name: positionName.trim(),
      base_salary: Number(baseSalary),
    });
  };

  return (
    <BaseModal
      title="Edit Position"
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
            Update
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Position Name</label>
          <input
            type="text"
            value={positionName}
            onChange={(e) => setPositionName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Base Salary</label>
          <input
            type="number"
            value={baseSalary}
            onChange={(e) => setBaseSalary(e.target.value)}
            className="form-control"
          />
        </div>
      </form>
    </BaseModal>
  );
}
