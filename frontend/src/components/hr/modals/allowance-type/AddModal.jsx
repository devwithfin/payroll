// components/modals/allowance-type/add-modal
import React, { useState } from "react";
import Swal from "sweetalert2";
import BaseModal from "../../../common/BaseModal";

export default function AddModal({ onClose, onSave }) {
  const [allowanceName, setAllowanceName] = useState("");
  const [isFixed, setIsFixed] = useState(true); // default true
  const [defaultAmount, setDefaultAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!allowanceName.trim()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Allowance name is required",
      });
      return;
    }

    const newData = {
      allowance_name: allowanceName.trim(),
      is_fixed: isFixed ? 1 : 0,
      default_amount: defaultAmount === "" ? null : parseFloat(defaultAmount),
    };

    onSave(newData); 
  };

  return (
    <BaseModal
      title="Add New Allowance Type"
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
          <label className="form-label">Allowance Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Tunjangan Makan"
            value={allowanceName}
            onChange={(e) => setAllowanceName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Is Fixed</label>
          <select
            className="form-select"
            value={isFixed ? "1" : "0"}
            onChange={(e) => setIsFixed(e.target.value === "1")}
          >
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Default Amount</label>
          <input
            type="number"
            className="form-control"
            placeholder="e.g. 1000000"
            value={defaultAmount}
            onChange={(e) => setDefaultAmount(e.target.value)}
          />
        </div>
      </form>
    </BaseModal>
  );
}
