import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import Table from "../../components/common/Table";
import AddModal from "../../components/finance/modals/payroll-periods/AddModal";
import EditModal from "../../components/finance/modals/payroll-periods/EditModal";

import {
  getAllPayrollPeriods,
  createPayrollPeriod,
  updatePayrollPeriod,
  deletePayrollPeriod,
} from "../../services/payrollPeriodService";

export default function PayrollPeriods() {
  const [periods, setPeriods] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  useEffect(() => {
    fetchPeriods();
  }, []);

  const fetchPeriods = async () => {
    try {
      const res = await getAllPayrollPeriods();
      setPeriods(res.data?.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to fetch payroll periods");
    }
  };

  const handleSave = async (data) => {
    try {
      await createPayrollPeriod(data);
      setShowAddModal(false);
      fetchPeriods();
      toast.success("Payroll period added");
    } catch (err) {
      console.error("Save error:", err);
      toast.error("Failed to save payroll period");
    }
  };

  const handleUpdate = async (data) => {
    console.log("DATA YANG DIKIRIM SAAT UPDATE:", data);
    try {
      await updatePayrollPeriod(data.id, data);  
      setShowEditModal(false);
      fetchPeriods();
      toast.success("Payroll period updated");
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update payroll period");
    }
  };

  const handleDelete = (row) => {
    console.log("Deleting ID:", row.period_id);  
    Swal.fire({
      title: "Are you sure?",
      text: `Delete period "${row.period_name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#1071b9",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deletePayrollPeriod(row.period_id); 
          fetchPeriods();
          toast.success("Payroll period deleted");
        } catch (err) {
          console.error("Delete error:", err);
          toast.error("Failed to delete payroll period");
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
      name: "Period Name",
      selector: (row) => row.period_name || "-",
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row) => row.start_date || "-",
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => row.end_date || "-",
      sortable: true,
    },
    {
      name: "Payroll Date",
      selector: (row) => row.payroll_date || "-",
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status || "-",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-warning text-white"
            onClick={() => {
              setSelectedPeriod(row);
              setShowEditModal(true);
            }}
            title="Edit"
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(row)}
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
        title="Payroll Period Data"
        data={periods}
        renderColumnsWithPage={renderColumnsWithPage}
        onAdd={() => setShowAddModal(true)}
      />

      {showAddModal && (
        <AddModal onClose={() => setShowAddModal(false)} onSave={handleSave} />
      )}

      {showEditModal && selectedPeriod && (
        <EditModal
          period={selectedPeriod}
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}
