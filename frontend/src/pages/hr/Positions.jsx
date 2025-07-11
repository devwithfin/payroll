import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Table from "../../components/common/Table";
import { formatRupiah } from "../../utils/formatCurrency"; 
import AddModal from "../../components/modals/position/AddModal";
import EditModal from "../../components/modals/position/EditModal";

import {
  getAllPositions,
  createPosition,
  updatePosition,
  deletePosition,
} from "../../services/positionService";

export default function Positions() {
  const [positions, setPositions] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);

  useEffect(() => {
    fetchPositions();
  }, []);

  const fetchPositions = async () => {
    try {
      const response = await getAllPositions();
      setPositions(response.data.data);
    } catch (error) {
      console.error("Failed to Fetch Positions Data:", error);
      toast.error("Failed to fetch position data");
    }
  };

  const handleSave = async (newPosition) => {
    try {
      await createPosition(newPosition);
      setShowAddModal(false);
      fetchPositions();
      toast.success("Position successfully saved");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to save position";
      toast.error(errorMsg);
      console.error(err);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      await updatePosition(updatedData.id, updatedData);
      setShowEditModal(false);
      fetchPositions();
      toast.success("Position successfully updated");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to updated position";
      toast.error(errorMsg);
      console.error(err);
    }
  };

  const handleDelete = (row) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete position "${row.position_name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#1071b9",
      confirmButtonText: "Yes!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deletePosition(row.position_id);
          fetchPositions();
          toast.success("Position deleted successfully");
        } catch (err) {
          const errMsg =
            err.response?.data?.message || "Failed to delete position";
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
      name: "Position Name",
      selector: (row) => row.position_name,
      sortable: true,
      width: "230px",
    },
    {
      name: "Department Name",
      selector: (row) => row.department.department_name,
      sortable: true,
      width: "230px",
    },
    
    {
      name: "Base Salary",
      selector: (row) => formatRupiah(row.base_salary),
      sortable: true,
      width: "200px",
    },

    {
      name: "Job Allowance",
      selector: (row) => formatRupiah(row.job_allowance),
      sortable: true,
      width: "200px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            onClick={() => {
              setSelectedPosition(row);
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
        title="Position Data"
        data={positions}
        renderColumnsWithPage={renderColumnsWithPage}
        onAdd={() => setShowAddModal(true)}
      />

      {showAddModal && (
        <AddModal onClose={() => setShowAddModal(false)} onSave={handleSave} />
      )}

      {showEditModal && (
        <EditModal
          position={selectedPosition}
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}
