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
      const nameExists = departments.some(
        (d) =>
          d.department_name.toLowerCase() ===
          newDepartment.department_name.toLowerCase()
      );

      if (nameExists) {
        toast.error("Department name already exists");
        return;
      }

      const res = await createDepartment(newDepartment);
      setDepartments((prev) => [res.data.data, ...prev]);
      setShowAddModal(false);
      toast.success("Department successfully saved");
    } catch (err) {
      let errorMsg =
        err.response?.data?.message || "Failed to save department";

      if (err.response?.status === 500) {
        errorMsg =
          "Internal server error. The department name might already exist.";
      }

      toast.error(errorMsg);
      console.error(err);
    }
  };

  const handleUpdate = async (updatedDepartment) => {
  try {
    await updateDepartment(updatedDepartment.department_id, {
      department_name: updatedDepartment.department_name,
    });

    setDepartments((prev) =>
      prev.map((dept) =>
        dept.department_id === updatedDepartment.department_id
          ? { ...dept, department_name: updatedDepartment.department_name }
          : dept
      )
    );

    setShowEditModal(false);
    toast.success("Department updated successfully");
  } catch (err) {
    toast.error("Failed to update department");
    console.error(err);
  }
};


const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {
    await deleteDepartment(id);
    setDepartments((prev) =>
      prev.filter((dept) => dept.department_id !== id)
    );
    toast.success("Department deleted successfully");
  } catch (err) {
    toast.error("Failed to delete department");
    console.error(err);
  }
};



  const renderColumnsWithPage = (currentPage, perPage) => [
    {
      name: "#",
      selector: (row, index) => (currentPage - 1) * perPage + index + 1,
      sortable: true,
      width: "80px",
    },
    {
      name: "Department Name",
      selector: (row) => row.department_name,
      sortable: true,
      width: "700px",
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
            onClick={() => handleDelete(row.department_id)}
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
        <AddModal
          onClose={() => setShowAddModal(false)}
          onSave={handleSave}
        />
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
