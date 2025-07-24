import React, { useState } from "react";
import BaseModal from "../../../common/BaseModal";

export default function RecapModal({ recap, onClose }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalItems = recap?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const currentData = (recap || []).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <BaseModal
      title="Allowance Recapitulation"
      onClose={onClose}
      footer={
        <div className="d-flex justify-content-between align-items-center w-100">
          <div>
            Page {currentPage} of {totalPages}
          </div>
          <div>
            <button
              className="btn me-2"
              style={{
                backgroundColor: "#1071b9",
                color: "white",
              }}
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="btn"
              style={{
                backgroundColor: "#1071b9",
                color: "white",
              }}
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
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
          {currentData.length > 0 ? (
            currentData.map((item, index) => (
              <tr key={index}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{item.full_name}</td>
                <td>
                  Rp {parseFloat(item.total_amount).toLocaleString("id-ID")}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </BaseModal>
  );
}
