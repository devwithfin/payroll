// components/modals/department/edit-modal
import React, { useEffect, useState } from "react";
import BaseModal from "../../../common/BaseModal";
import Swal from "sweetalert2";

export default function EditModal({ department, onClose, onSave }) {
  const [departmentName, setDepartmentName] = useState("");

   useEffect(() => {
     if (department) {
       setDepartmentName(department.department_name || "");     }
   }, [department]);

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

  onSave({
      id: department.department_id,
      department_name: departmentName.trim(),
    });
  };

  return (
    <BaseModal
      title="Edit Department"
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn"
            style={{ backgroundColor: "#1071B9", color: "#fff" }}
            onClick={handleSubmit}
          >
            Update
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
          />
        </div>
      </form>
    </BaseModal>
  );
}
