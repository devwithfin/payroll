// pages/hr/emmployees
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import Table from "../../components/common/Table";
import AddModal from "../../components/hr/modals/employee/AddModal";
import EditModal from "../../components/hr/modals/employee/EditModal";
import InfoModal from "../../components/hr/modals/employee/InfoModal";

import {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../services/employeeService";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await getAllEmployees();
      setEmployees(res.data.data || []);
    } catch {
      toast.error("Failed to fetch employee data");
    }
  };

  const handleSave = async (data) => {
    try {
      await createEmployee(data);
      await fetchEmployees(); 
      setShowAddModal(false);
      toast.success("Employee added successfully");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to save employee";
      toast.error(msg);
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updateEmployee(data.id, data);
      await fetchEmployees();
      setShowEditModal(false);
      toast.success("Employee updated successfully");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update employee";
      toast.error(msg);
    }
  };

  const handleDelete = (row) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete employee "${row.full_name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#1071b9",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const employeeId = row.employee_id || row.id;
          await deleteEmployee(employeeId);
          setEmployees(
            employees.filter((e) => (e.employee_id || e.id) !== employeeId)
          );
          toast.success("Employee deleted successfully");
        } catch {
          toast.error("Failed to delete employee");
        }
      }
    });
  };

  const renderColumnsWithPage = (currentPage, perPage) => [
    {
      name: "#",
      selector: (row, index) => (currentPage - 1) * perPage + index + 1,
      width: "50px",
    },
    {
      name: "Full Name",
      selector: (row) => row.full_name,
      sortable: true,
      width: "320px",
    },
    {
      name: "Position",
      selector: (row) => row.position_name || "-",
      width: "300px",
    },
    {
      name: "Join Date",
      selector: (row) => row.join_date,
      width: "100px",
    },
    {
      name: "Status",
      selector: (row) => row.employment_status,
      width: "100px",
    },
    {
      name: "Actions",
     cell: (row) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-info text-white"
            title="Info"
            onClick={() => {
              setSelectedEmployee(row);
              setShowInfoModal(true);
            }}
          >
            <FontAwesomeIcon icon={faEye} />
          </button>
          <button
            className="btn btn-sm btn-warning text-white"
            title="Edit"
            onClick={() => {
              setSelectedEmployee(row);
              setShowEditModal(true);
            }}
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button
            className="btn btn-sm btn-danger"
            title="Delete"
            onClick={() => handleDelete(row)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-1">
      <Table
        title="Employee Data"
        data={employees}
        renderColumnsWithPage={renderColumnsWithPage}
        onAdd={() => setShowAddModal(true)}
      />

      {showAddModal && (
        <AddModal
          onClose={() => setShowAddModal(false)}
          onSave={handleSave}
        />
      )}
      {showEditModal && (
        <EditModal
          employee={selectedEmployee}
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdate}
        />
      )}
      {showInfoModal && (
        <InfoModal
          employee={selectedEmployee}
          onClose={() => setShowInfoModal(false)}
        />
      )}
    </div>
  );
}
