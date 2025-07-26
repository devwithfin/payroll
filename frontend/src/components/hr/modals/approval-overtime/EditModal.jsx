//components/modals/approval-overtime/edit-modal
import React, { useState, useEffect } from "react";
import BaseModal from "../../../common/BaseModal";
import { approveOvertimeRequest } from "../../../../services/overtimeRequestService";
import { toast } from "react-toastify";

export default function EditModal({ data, approverId, onClose, onUpdated }) {
  const [form, setForm] = useState({
    approval_status: "",
    notes_approval: "",
  });

  useEffect(() => {
    if (data) {
      setForm({
        approval_status: data.approval_status || "",
        notes_approval: data.notes_approval || "",
      });
    }
  }, [data]);

  const handleSubmit = async () => {
    if (!form.approval_status) {
      toast.warning("Please select an approval status first.");
      return;
    }

    try {
      await approveOvertimeRequest(data.request_id, {
        approval_status: form.approval_status,
        notes_approval: form.notes_approval,
        approved_by_hrd: approverId,
      });
      toast.success("Overtime status successfully updated.");
      onClose();
      onUpdated();
    } catch (err) {
      toast.error("Failed to update overtime status.");
      console.error(err);
    }
  };

  return (
    <BaseModal
      title="Overtime Approval"
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
      <div className="mb-3">
        <label className="form-label">Employee Name</label>
        <input
          className="form-control"
          value={data?.employee?.full_name || "-"}
          disabled
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Approval Status</label>
        <select
          className="form-select"
          value={form.approval_status}
          onChange={(e) =>
            setForm({ ...form, approval_status: e.target.value })
          }
        >
          <option value="">-- Select Status --</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Approval Notes</label>
        <textarea
          className="form-control"
          value={form.notes_approval}
          onChange={(e) => setForm({ ...form, notes_approval: e.target.value })}
        />
      </div>
    </BaseModal>
  );
}
