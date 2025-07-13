// components/modals/attendance/recap-modal
import React from "react";
import BaseModal from "../../common/BaseModal";

export default function ModalRecap({ recap, onClose }) {
  return (
    <BaseModal
      title="Attendance Recap"
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
            <th>Present</th>
            <th>Sick</th>
            <th>Leave</th>
            <th>Absent</th>
          </tr>
        </thead>
        <tbody>
          {recap.map((item, index) => (
            <tr key={item.full_name}>
              <td>{index + 1}</td>
              <td>{item.full_name}</td>
              <td>{item.Present || 0}</td>
              <td>{item.Sick || 0}</td>
              <td>{item.Leave || 0}</td>
              <td>{item.Absent || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </BaseModal>
  );
}
