// components/hr/modals/deduction-type/EditModal.jsx
import React, { useState, useEffect } from "react";
import BaseModal from "../../../common/BaseModal";
import Swal from "sweetalert2";

export default function EditModal({ deduction, onClose, onSave }) {
  const [deductionName, setDeductionName] = useState("");

  useEffect(() => {
    if (deduction) {
      setDeductionName(deduction.deduction_name || "");
    }
  }, [deduction]);

  const handleSubmit = () => {
    if (!deductionName.trim()) {
      return Swal.fire("Error", "Deduction Name is required", "error");
    }

    const finalData = {
      id: deduction.deduction_id || deduction.id,
      deduction_name: deductionName,
    };

    onSave(finalData);
  };

  return (
    <BaseModal
      title="Edit Deduction"
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
