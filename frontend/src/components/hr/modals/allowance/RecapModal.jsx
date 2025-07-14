import React from "react";
import BaseModal from "../../../common/BaseModal";

export default function RecapModal({ recap, onClose }) {
  return (
    <BaseModal
      title="Allowance Recapitulation"
      onClose={onClose}
      footer={
        <button className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
      }
    >
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Employee</th>
            <th>Total Allowance</th>
          </tr>
        </thead>
        <tbody>
          {(recap || []).map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.full_name}</td>
              <td>Rp {parseFloat(item.total_amount).toLocaleString("id-ID")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </BaseModal>
  );
}
