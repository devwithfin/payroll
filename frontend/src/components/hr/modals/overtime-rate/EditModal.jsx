// components/hr/modals/overtime-rates/edit-modal
import React, { useEffect, useState } from "react";
import BaseModal from "../../../common/BaseModal";
import Swal from "sweetalert2";

export default function EditModal({ overtimeRate, onClose, onSave }) {
  const [rateType, setRateType] = useState("");
  const [multiplier, setMultiplier] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (overtimeRate) {
      setRateType(overtimeRate.rate_type || "");
      setMultiplier(overtimeRate.multiplier || "");
      setDescription(overtimeRate.description || "");
    }
  }, [overtimeRate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rateType.trim() || !multiplier) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Data",
        text: "Please fill in the rate type",
      });
      return;
    }

    const updatedData = {
      rate_id: overtimeRate.rate_id,
      rate_type: rateType.trim(),
      multiplier: parseFloat(multiplier),
      description: description.trim() || null,
    };

    onSave(updatedData);
  };

  return (
    <BaseModal
      title="Edit Overtime Rate"
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
          <label className="form-label">Rate Type</label>
          <input
            type="text"
            className="form-control"
            value={rateType}
            onChange={(e) => setRateType(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Multiplier</label>
          <input
            type="number"
            className="form-control"
            step="0.01"
            value={multiplier}
            onChange={(e) => setMultiplier(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
      </form>
    </BaseModal>
  );
}
