// components/modals/department/add-modal
import React, { useState } from "react";
import BaseModal from "../../../common/BaseModal";
import Swal from "sweetalert2";

export default function AddModal({ onClose, onSave }) {
  const [departmentName, setDepartmentName] = useState("");;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!departmentName.trim()) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Data",
        text: "Please fill in the department name.",
      });
      return;
    }
    const newData = {
      department_name: departmentName.trim(),
    };

    onSave(newData);
  };

  return (
    <BaseModal
      title="Add New Department"
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
            Save
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Department Name</label>
          <input
            type="text"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            className="form-control"
            placeholder="e.g. Human Resources"
          />
        </div>
      </form>
    </BaseModal>
  );
}
