// pages/hr/departments
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import Table from "../../components/common/Table";
import AddModal from "../../components/modals/department/AddModal";
import EditModal from "../../components/modals/department/EditModal";

import {
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../../services/departmentService";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await getAllDepartments();
      setDepartments(response.data.data);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
      toast.error("Failed to fetch department data");
    }
  };

  const handleSave = async (newDepartment) => {
    try {
      await createDepartment(newDepartment);
      setShowAddModal(false);
      fetchDepartments();
      toast.success("Department successfully saved");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to save department";
      toast.error(errorMsg);
      console.error(err);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      await updateDepartment(updatedData.id, updatedData);
      setShowEditModal(false);
      fetchDepartments();
      toast.success("Department successfully updated");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to update department";
      toast.error(errorMsg);
      console.error(err);
    }
  };

  const handleDelete = (row) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete department "${row.department_name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#1071b9",
      confirmButtonText: "Yes!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDepartment(row.department_id);
          fetchDepartments();
          toast.success("Department deleted successfully");
        } catch (err) {
          const errMsg =
            err.response?.data?.message || "Failed to delete department";
          toast.error(errMsg);
        }
      }
    });
  };

  const renderColumnsWithPage = (currentPage, perPage) => [
    {
      name: "#",
      selector: (row, index) => (currentPage - 1) * perPage + index + 1,
      sortable: true,
      width: "50px",
    },
    {
      name: "Department Name",
      selector: (row) => row.department_name,
      sortable: true,
      width: "860px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            onClick={() => {
              setSelectedDepartment(row);
              setShowEditModal(true);
            }}
            className="btn btn-sm btn-warning text-white"
            title="Edit"
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button
            onClick={() => handleDelete(row)}  
            className="btn btn-sm btn-danger"
            title="Delete"
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
        title="Department Data"
        data={departments}
        renderColumnsWithPage={renderColumnsWithPage}
        onAdd={() => setShowAddModal(true)}
      />

      {showAddModal && (
        <AddModal onClose={() => setShowAddModal(false)} onSave={handleSave} />
      )}

      {showEditModal && (
        <EditModal
          department={selectedDepartment}
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}
