// components/modals/allowance-type/edit-modal
import React, { useEffect, useState } from "react";
import BaseModal from "../../../common/BaseModal";
import Swal from "sweetalert2";

export default function EditModal({ allowance, onClose, onSave }) {
  const [name, setName] = useState("");
  const [defaultAmount, setDefaultAmount] = useState("");
  const [isFixed, setIsFixed] = useState("1");

  useEffect(() => {
    if (allowance) {
      setName(allowance.allowance_name || "");
      setDefaultAmount(allowance.default_amount?.toString() || "");
   setIsFixed(
  allowance.is_fixed === true || allowance.is_fixed === 1 ? "1" : "0"
);

    }
  }, [allowance]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Data",
        text: "Please fill in the allowance name",
      });
      return;
    }

    const updatedData = {
      allowance_id: allowance.allowance_id,
      allowance_name: name.trim(),
      default_amount: defaultAmount ? parseInt(defaultAmount) : null,
      is_fixed: parseInt(isFixed),
    };

    onSave(updatedData);
  };

  return (
    <BaseModal
      title="Edit Allowance Type"
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
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
          <label className="form-label">Allowance Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Default Amount</label>
          <input
            type="text"
            className="form-control"
            value={defaultAmount}
            onChange={(e) =>
              setDefaultAmount(e.target.value.replace(/[^0-9]/g, ""))
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Type</label>
         <select
  className="form-select"
  value={isFixed === true || isFixed === "1" ? "1" : "0"}
  onChange={(e) => setIsFixed(e.target.value)}
>
  <option value="1">Fixed</option>
  <option value="0">Not Fixed</option>
</select>

        </div>
      </form>
    </BaseModal>
  );
}
