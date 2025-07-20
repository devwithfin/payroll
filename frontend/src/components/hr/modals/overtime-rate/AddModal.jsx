// components/modals/overtime-rates/add-modal
import React, { useState } from "react";
import BaseModal from "../../../common/BaseModal";
import Swal from "sweetalert2";

export default function AddModal({ onClose, onSave }) {
  const [rateType, setRateType] = useState("");
  const [multiplier, setMultiplier] = useState("");
  const [description, setDescription] = useState("");

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

    const newData = {
      rate_type: rateType.trim(),
      multiplier: parseFloat(multiplier),
      description: description.trim() || null,
    };

    onSave(newData);
  };

  return (
    <BaseModal
      title="Add New Overtime Rate"
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
          <label className="form-label">Rate Type</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Weekday Overtime"
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
            placeholder="e.g. 1.5"
            value={multiplier}
            onChange={(e) => setMultiplier(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="2"
            placeholder="Optional"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
      </form>
    </BaseModal>
  );
}
