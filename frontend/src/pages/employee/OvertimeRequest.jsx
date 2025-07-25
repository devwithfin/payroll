// pages/hr/overtime-request
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Table from "../../components/common/Table";
import AddModal from "../../components/employee/modals/overtime-request/AddModal";

import {
  getOvertimeRequestsByEmployee,
  createOvertimeRequest,
} from "../../services/overtimeRequest";
import { getProfile } from "../../services/authService";

export default function OvertimeRequest() {
  const [overtimeRequests, setOvertimeRequests] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [employeeId, setEmployeeId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializePage();
  }, []);

  const initializePage = async () => {
    try {
      const profileResponse = await getProfile();
      const empId = profileResponse.data?.user?.employee?.employee_id;
      if (!empId) return;

      setEmployeeId(empId);
      await fetchOvertimeRequests(empId);
    } catch (error) {
      if (error.response?.status !== 401) {
        toast.error("Failed to load page data");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchOvertimeRequests = async (empId) => {
    try {
      const response = await getOvertimeRequestsByEmployee(empId);
      setOvertimeRequests(response.data?.data || []);
    } catch (error) {
      if (error.response?.status !== 401) {
        toast.error("Failed to fetch overtime request");
      }
      setOvertimeRequests([]);
    }
  };

  const handleSave = async (newRequest) => {
    try {
      await createOvertimeRequest(newRequest);
      toast.success("Overtime request successfully");
      setShowAddModal(false);
      if (employeeId) fetchOvertimeRequests(employeeId);
    } catch (err) {
      const msg =
        err.response?.data?.message || "Failed to save overtime request";
      toast.error(msg);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID");
  };

  const formatTime = (timeString) => {
    if (!timeString) return "-";
    return timeString.slice(0, 5);
  };

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
      sortable: false,
      width: "50px",
    },
    {
      name: "Request Date",
      selector: (row) => formatDate(row.request_date),
      sortable: true,
      width: "150px",
    },
    {
      name: "Overtime Date",
      selector: (row) => formatDate(row.overtime_date),
      sortable: true,
      width: "150px",
    },
    {
      name: "Start Time",
      selector: (row) => formatTime(row.start_time),
      width: "100px",
    },
    {
      name: "End Time",
      selector: (row) => formatTime(row.end_time),
      width: "100px",
    },
    {
      name: "Reason",
      selector: (row) => row.reason || "-",
      width: "300px",
    },
    {
      name: "Approval Status",
      cell: (row) => getStatusBadge(row.approval_status),
      sortable: true,
    },
  ];

  if (loading) {
    return (
      <div className="container mx-auto p-1">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "400px" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-1">
      <Table
        title="Overtime Requests"
        data={overtimeRequests}
        renderColumnsWithPage={renderColumnsWithPage}
        onAdd={() => setShowAddModal(true)}
      />

      {showAddModal && (
        <AddModal
          employeeId={employeeId}
          onClose={() => setShowAddModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
