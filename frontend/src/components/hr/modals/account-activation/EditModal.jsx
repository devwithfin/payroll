//components/hr/modals/account-activation/edit-modal
import React, { useState, useEffect } from "react";
import BaseModal from "../../../common/BaseModal";
import Swal from "sweetalert2";
import { updateAccountPassword } from "../../../../services/AccountService";

export default function EditModal({ account, onClose, onSave }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    setPassword("");
    setConfirmPassword("");
  }, [account]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      return Swal.fire("Error", "Both fields are required", "error");
    }

    if (password !== confirmPassword) {
      return Swal.fire("Error", "Passwords do not match", "error");
    }

    try {
      await updateAccountPassword(account.id_user, { password });
      onSave();  
    } catch (err) {
      console.error("Activation failed:", err);
      const errMsg = err.response?.data?.message || "Activation failed";
      Swal.fire("Error", errMsg, "error");
    }
  };

  return (
    <BaseModal
      title="Account Activation"
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
            Submit
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            placeholder="Enter password"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-medium">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-control"
            placeholder="Confirm password"
          />
        </div>
      </form>
    </BaseModal>
  );
}
