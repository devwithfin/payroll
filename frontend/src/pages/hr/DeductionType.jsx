// pages/hr/Deduction.jsx
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import Table from "../../components/common/Table";
import AddModal from "../../components/hr/modals/deduction-type/AddModal";
import EditModal from "../../components/hr/modals/deduction-type/EditModal";

import {
  getAllDeductions,
  createDeduction,
  updateDeduction,
  deleteDeduction,
} from "../../services/deductionService";

export default function Deduction() {
  const [deductions, setDeductions] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDeduction, setSelectedDeduction] = useState(null);

  useEffect(() => {
    fetchDeductions();
  }, []);

  const fetchDeductions = async () => {
    try {
      const res = await getAllDeductions();
      setDeductions(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch deductions");
    }
  };

  const handleSave = async (data) => {
    try {
      await createDeduction(data);
      await fetchDeductions();
      setShowAddModal(false);
      toast.success("Deduction added successfully");
    } catch (err) {
      toast.error("Failed to save deduction");
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updateDeduction(data.id, data);
      await fetchDeductions();
      setShowEditModal(false);
      toast.success("Deduction updated successfully");
    } catch (err) {
      toast.error("Failed to update deduction");
    }
  };

  const handleDelete = (row) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete deduction "${row.deduction_name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDeduction(row.deduction_id || row.id);
          await fetchDeductions();
          toast.success("Deduction deleted successfully");
        } catch {
          toast.error("Failed to delete deduction");
        }
      }
    });
  };

  const renderColumnsWithPage = (currentPage, perPage) => [
    {
      name: "#",
      selector: (row, index) => (currentPage - 1) * perPage + index + 1,
      width: "60px",
    },
    {
      name: "Deduction Name",
      selector: (row) => row.deduction_name,
      sortable: true,
    },
    {
      name: "Actions",
      width: "120px",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-warning text-white"
            title="Edit"
            onClick={() => {
              setSelectedDeduction(row);
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
    <div className="container mx-auto p-2">
      <Table
        title="Deduction List"
        data={deductions}
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
          deduction={selectedDeduction}
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}
