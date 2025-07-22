// pages/hr/overtime-approval
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import Table from "../../components/common/Table";
import EditModal from "../../components/hr/modals/approval-overtime/EditModal";
import InfoModal from "../../components/hr/modals/approval-overtime/InfoModal";

import { getAllOvertimeRequests, deleteOvertimeRequest } from "../../services/overtimeRequest";
import { getProfile } from "../../services/authService";

export default function OvertimeApproval() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [hrId, setHrId] = useState(null);

  useEffect(() => {
    initializePage();
  }, []);

  const initializePage = async () => {
    try {
      const profileRes = await getProfile();
      const id = profileRes?.data?.user?.employee?.employee_id;
      setHrId(id);
      await fetchRequests();
    } catch (err) {
      toast.error("Gagal mengambil data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await getAllOvertimeRequests();
      setRequests(res.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Gagal mengambil data lembur");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    try {
      await deleteOvertimeRequest(id);
      toast.success("Data berhasil dihapus");
      fetchRequests();
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus data");
    }
  };

  const formatDate = (dateStr) => (dateStr ? new Date(dateStr).toLocaleDateString("id-ID") : "-");

  const getStatusBadge = (status) => {
  const lower = status?.toLowerCase();
  let bg = "#6c757d";
  if (lower === "approved") bg = "#28a745";
  else if (lower === "pending") bg = "#ffc107";
  else if (lower === "rejected") bg = "#dc3545";

  return (
    <span
      className="badge text-white text-capitalize text-center"
      style={{
        backgroundColor: bg,
        minWidth: "100px",
        fontSize: "0.9rem",
        padding: "0.4rem",
      }}
    >
      {status || "Pending"}
    </span>
  );
};

  const renderColumnsWithPage = (currentPage, perPage) => [
    {
      name: "#",
      selector: (row, index) => (currentPage - 1) * perPage + index + 1,
      width: "50px",
    },
    {
      name: "Full Name",
      selector: (row) => row.employee?.full_name || "-",
      sortable: true,
      width : "150px"
    },
    {
      name: "Request Date",
      selector: (row) => formatDate(row.request_date),
       width : "150px"
    },
    {
      name: "Overtime Date",
      selector: (row) => formatDate(row.overtime_date),
      width : "150px"
    },
    {
      name: "Reason",
      selector: (row) => row.reason || "-",
    },

    {
      name: "Status",
      cell: (row) => getStatusBadge(row.approval_status),
    },
    {
      name: "Action",
      width: "180px",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-info text-white"
            onClick={() => {
              setSelectedRow(row);
              setShowInfoModal(true);
            }}
            title="Detail"
          >
            <FontAwesomeIcon icon={faEye} />
          </button>
          <button
            className="btn btn-sm btn-warning text-white"
            onClick={() => {
              setSelectedRow(row);
              setShowEditModal(true);
            }}
            title="Edit"
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(row.request_id)}
            title="Delete"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-3">
      <Table
        title="Overtime Approval"
        data={requests}
        renderColumnsWithPage={renderColumnsWithPage}
        showAddButton={false}
      />

      {showEditModal && (
        <EditModal
          data={selectedRow}
          approverId={hrId}
          onClose={() => setShowEditModal(false)}
          onUpdated={fetchRequests}
        />
      )}

      {showInfoModal && (
      <InfoModal
  data={selectedRow}
  employeeName={selectedRow?.employee?.full_name || "-"}
  onClose={() => setShowInfoModal(false)}
/>
      )}
    </div>
  );
}

