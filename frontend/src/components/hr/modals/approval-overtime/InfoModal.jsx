//components/modals/approval-overtime/info-modal
import React from "react";
import BaseModal from "../../../common/BaseModal";

export default function InfoModal({ data, employeeName, onClose }) {
  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString("id-ID") : "-";

  const formatTime = (timeStr) => (timeStr ? timeStr.slice(0, 5) : "-");

  const formatCurrency = (value) =>
    value ? `Rp ${Number(value).toLocaleString("id-ID")}` : "-";

  return (
    <BaseModal title="Detail Lembur" onClose={onClose}>
      <div className="mb-3">
        <label className="form-label">Nama Karyawan</label>
        <input className="form-control" value={employeeName || "-"} disabled />
      </div>

      <div className="mb-3">
        <label className="form-label">Tanggal Lembur</label>
        <input
          className="form-control"
          value={formatDate(data?.overtime_date)}
          disabled
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Jam Mulai</label>
        <input
          className="form-control"
          value={formatTime(data?.start_time)}
          disabled
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Jam Selesai</label>
        <input
          className="form-control"
          value={formatTime(data?.end_time)}
          disabled
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Jumlah Uang Lembur</label>
        <input
          className="form-control"
          value={formatCurrency(data?.overtime_amount)}
          disabled
        />
      </div>
    </BaseModal>
  );
}

