// pages/hr/overtime-rates
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import Table from "../../components/common/Table";
import AddModal from "../../components/hr/modals/overtime-rate/AddModal";
import EditModal from "../../components/hr/modals/overtime-rate/EditModal";

import {
  getAllOvertimeRates,
  createOvertimeRate,
  updateOvertimeRate,
  deleteOvertimeRate,
} from "../../services/overtimeRateService";

export default function OvertimeRates() {
  const [overtimeRates, setOvertimeRates] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedOvertimeRate, setSelectedOvertimeRate] = useState(null);

  useEffect(() => {
    fetchOvertimeRates();
  }, []);

  const fetchOvertimeRates = async () => {
    try {
      const response = await getAllOvertimeRates();
      setOvertimeRates(response.data.data);
    } catch (error) {
      console.error("Failed to fetch overtime rates:", error);
      toast.error("Failed to fetch overtime rate data");
    }
  };

  const handleSave = async (newRate) => {
    try {
      await createOvertimeRate(newRate);
      setShowAddModal(false);
      fetchOvertimeRates();
      toast.success("Overtime rate successfully saved");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to save overtime rate";
      toast.error(errorMsg);
      console.error(err);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      await updateOvertimeRate(updatedData.rate_id, updatedData);
      setShowEditModal(false);
      fetchOvertimeRates();
      toast.success("Overtime rate successfully updated");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to update overtime rate";
      toast.error(errorMsg);
      console.error(err);
    }
  };

  const handleDelete = (row) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete overtime rate "${row.rate_type}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#1071b9",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteOvertimeRate(row.rate_id);
          fetchOvertimeRates();
          toast.success("Overtime rate deleted successfully");
        } catch (err) {
          const errMsg =
            err.response?.data?.message || "Failed to delete overtime rate";
          toast.error(errMsg);
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
      name: "Rate Type",
      selector: (row) => row.rate_type,
      sortable: true,
      width : "250px"
    },
    {
      name: "Multiplier",
      selector: (row) => row.multiplier,
      sortable: true,
       width : "120px"
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: false,
       width : "500px"
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            onClick={() => {
              setSelectedOvertimeRate(row);
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
        title="Overtime Rate Data"
        data={overtimeRates}
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
          overtimeRate={selectedOvertimeRate}
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}
  