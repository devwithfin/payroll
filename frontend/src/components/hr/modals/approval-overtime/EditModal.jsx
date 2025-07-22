//components/modals/approval-overtime/edit-modal
import React, { useState, useEffect } from "react";
import BaseModal from "../../../common/BaseModal";
import { approveOvertimeRequest } from "../../../../services/overtimeRequest";
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
      toast.warning("Pilih status approval terlebih dahulu.");
      return;
    }

    try {
      await approveOvertimeRequest(data.request_id, {
        approval_status: form.approval_status,
        notes_approval: form.notes_approval,
        approver_id: approverId,
      });
      toast.success("Status lembur berhasil diperbarui.");
      onClose();
      onUpdated();
    } catch (err) {
      toast.error("Gagal memperbarui status lembur.");
      console.error(err);
    }
  };

  return (
    <BaseModal
      title="Approval Overtime"
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>
            Batal
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Simpan
          </button>
        </>
      }
    >
      <div className="mb-3">
        <label className="form-label">Nama Karyawan</label>
        <input
          className="form-control"
          value={data?.employee?.full_name || "-"}
          disabled
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Status Approval</label>
        <select
          className="form-select"
          value={form.approval_status}
          onChange={(e) =>
            setForm({ ...form, approval_status: e.target.value })
          }
        >
          <option value="">-- Pilih Status --</option>
          <option value="Approved">Disetujui</option>
          <option value="Rejected">Ditolak</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Catatan</label>
        <textarea
          className="form-control"
          value={form.notes_approval}
          onChange={(e) =>
            setForm({ ...form, notes_approval: e.target.value })
          }
        />
      </div>
    </BaseModal>
  );
}
