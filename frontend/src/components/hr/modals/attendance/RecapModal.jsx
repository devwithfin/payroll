// components/hr/modals/attendance/add-modal
import React, { useState } from "react";
import BaseModal from "../../../common/BaseModal";

export default function ModalRecap({ recap, onClose }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(recap.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedRecap = recap.slice(startIdx, startIdx + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <BaseModal
      title="Attendance Recapitulation"
      onClose={onClose}
      footer={
        <div className="d-flex justify-content-between w-100 align-items-center">
          <div>Page {currentPage} of {totalPages}</div>
          <div>
            <button
              className="btn me-2"
              style={{ backgroundColor: "#1071b9", color: "white" }}
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="btn"
              style={{ backgroundColor: "#1071b9", color: "white" }}
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      }
    >
      <table className="table table-bordered table-striped mb-3">
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
          {paginatedRecap.map((item, index) => (
            <tr key={item.full_name}>
              <td>{startIdx + index + 1}</td>
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
