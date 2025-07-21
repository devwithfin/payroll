// components/hr/modals/deduction-type/AddModal.jsx
import React, { useState } from "react";
import BaseModal from "../../../common/BaseModal";
import Swal from "sweetalert2";

export default function AddModal({ onClose, onSave }) {
  const [deductionName, setDeductionName] = useState("");

  const handleSubmit = () => {
    if (!deductionName.trim()) {
      return Swal.fire("Error", "Deduction Name is required", "error");
    }

    onSave({ deduction_name: deductionName });
  };

  return (
    <BaseModal
      title="Add Deduction"
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
      <Input
        label="Deduction Name"
        value={deductionName}
        onChange={(val) => setDeductionName(val)}
      />
    </BaseModal>
  );
}

function Input({ label, value, onChange, type = "text" }) {
  return (
    <div className="mb-3">
      <label className="form-label fw-medium">{label}</label>
      <input
        type={type}
        className="form-control"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        style={{ border: "1px solid #ccc" }}
      />
    </div>
  );
}

