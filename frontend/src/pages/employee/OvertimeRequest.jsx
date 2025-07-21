// pages/employee/overtime-request
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
      const empId = profileResponse.data.user.employee.employee_id;
      setEmployeeId(empId);
      await fetchOvertimeRequests(empId);
    } catch (error) {
      console.error("Failed to initialize page:", error);
      toast.error("Failed to load page data");
    } finally {
      setLoading(false);
    }
  };

  const fetchOvertimeRequests = async (empId) => {
    try {
      const response = await getOvertimeRequestsByEmployee(empId);
      setOvertimeRequests(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch overtime requests:", error);
      if (error.response?.status !== 404) {
        toast.error("Failed to fetch overtime request data");
      }
      setOvertimeRequests([]);
    }
  };

  const handleSave = async (newRequest) => {
    try {
      await createOvertimeRequest(newRequest);
      setShowAddModal(false);
      fetchOvertimeRequests(employeeId);
      toast.success("Overtime request successfully saved");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to save overtime request";
      toast.error(errorMsg);
      console.error(err);
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
    const statusMap = {
      Pending: "badge bg-warning text-dark",
      Approved: "badge bg-success",
      Rejected: "badge bg-danger",
    };
    return statusMap[status] || "badge bg-secondary";
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
      width: "120px",
    },
    {
      name: "Overtime Date",
      selector: (row) => formatDate(row.overtime_date),
      sortable: true,
      width: "120px",
    },
    {
      name: "Start Time",
      selector: (row) => formatTime(row.start_time),
      sortable: false,
      width: "100px",
    },
    {
      name: "End Time",
      selector: (row) => formatTime(row.end_time),
      sortable: false,
      width: "100px",
    },
    {
      name: "Reason",
      selector: (row) => row.reason || "-",
      sortable: false,
      width: "300px",
    },
    {
      name: "Approval Status",
      cell: (row) => (
        <span className={getStatusBadge(row.approval_status)}>
          {row.approval_status || "Pending"}
        </span>
      ),
      sortable: true,
      width: "150px",
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
        title="My Overtime Requests"
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
