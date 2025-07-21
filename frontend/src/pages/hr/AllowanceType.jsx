// pages/hr/allowance-type
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { formatRupiah } from "../../utils/formatCurrency";


import Table from "../../components/common/Table";
import AddModal from "../../components/hr/modals/allowance-type/AddModal";
import EditModal from "../../components/hr/modals/allowance-type/EditModal";

import {
  getAllAllowances,
  createAllowance,
  updateAllowance,
  deleteAllowance,
} from "../../services/allowanceService";

export default function AllowanceTypePage() {
  const [allowances, setAllowances] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAllowance, setSelectedAllowance] = useState(null);

  useEffect(() => {
    fetchAllowances();
  }, []);

  const fetchAllowances = async () => {
    try {
      const response = await getAllAllowances();
      console.log("API Response", response);
      setAllowances(response.data.data || response.data.allowances || []);
    } catch (error) {
      console.error("Failed to fetch allowances:", error);
      toast.error("Failed to fetch allowance data");
    }
  };

  const handleSave = async (newAllowance) => {
    try {
      await createAllowance(newAllowance); 
      setShowAddModal(false);
      fetchAllowances();
      toast.success("Allowance successfully saved");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to save allowance";
      toast.error(errorMsg);
      console.error(err);
    }
  };

const handleUpdate = async (updatedData) => {
  try {
    await updateAllowance(updatedData.allowance_id, updatedData);
    setShowEditModal(false);
    fetchAllowances();
    toast.success("Allowance successfully updated");
  } catch (err) {
    const errorMsg =
      err.response?.data?.message || "Failed to update allowance";
    toast.error(errorMsg);
    console.error(err);
  }
};

const handleDelete = (row) => {
  Swal.fire({
    title: "Are you sure?",
    text: `Delete allowance "${row.allowance_name}"?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#1071b9",
    confirmButtonText: "Yes",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await deleteAllowance(row.allowance_id); 
        fetchAllowances(); 
        toast.success("Allowance deleted successfully");
      } catch (err) {
        const errMsg =
          err.response?.data?.message || "Failed to delete allowance";
        toast.error(errMsg);
        console.error(err);
      }
    }
  });
};


  const renderColumnsWithPage = (currentPage, perPage) => [
    {
      name: "#",
      selector: (row, index) => (currentPage - 1) * perPage + index + 1,
      sortable: false,
      width: "50px",
    },
    {
      name: "Allowance Name",
      selector: (row) => row.allowance_name,
      sortable: true,
      width: "250px",
    },
    {
      name: "Type", 
      selector: (row) => (row.is_fixed ? "Fixed" : "Not Fixed"), 
      sortable: true,
      width: "150px",
    },
    {
      name: "Default Amount",
      selector: (row) =>
  row.default_amount !== null ? formatRupiah(row.default_amount) : "-",

      sortable: true,
      width: "180px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            onClick={() => {
              setSelectedAllowance(row);
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
        title="Allowance Type Data"
        data={allowances}
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
    allowance={selectedAllowance}
    onClose={() => setShowEditModal(false)}
    onSave={handleUpdate}
  />
)}
    </div>
  );
}