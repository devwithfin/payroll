// pages/hr/deductions
import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import Table from "../../components/common/Table";
import AddModal from "../../components/hr/modals/deduction/AddModal";
import EditModal from "../../components/hr/modals/deduction/EditModal";
import RecapModal from "../../components/hr/modals/deduction/RecapModal";

import {
  getAllEmployeeDeductions,
  deleteEmployeeDeduction,
} from "../../services/employeeDeductionService";
import { getAllPayrollPeriods } from "../../services/payrollPeriodService";

export default function Deductions() {
  const [data, setData] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showRecapModal, setShowRecapModal] = useState(false);
  const [recapData, setRecapData] = useState([]);

  // Get all periods & auto select active
  useEffect(() => {
    getAllPayrollPeriods()
      .then((res) => {
        const sorted = res.data.data.sort(
          (a, b) => new Date(a.start_date) - new Date(b.start_date)
        );
        setPeriods(sorted);

        const today = new Date();
        const active = sorted.find((p) => {
          const start = new Date(p.start_date);
          const end = new Date(p.end_date);
          return today >= start && today <= end;
        });

        if (active) setSelectedPeriod(active);
        else if (sorted.length > 0) setSelectedPeriod(sorted[sorted.length - 1]);
      })
      .catch(() => toast.error("Failed to load payroll periods"));
  }, []);

  // Get data by period
  const fetchData = useCallback(async () => {
    if (!selectedPeriod) return;
    try {
      const res = await getAllEmployeeDeductions();
      const { start_date, end_date } = selectedPeriod;
      const filtered = res.data.data.filter((item) => {
        const date = new Date(item.effective_date);
        return date >= new Date(start_date) && date <= new Date(end_date);
      });
      setData(filtered);
    } catch {
      toast.error("Failed to fetch employee deductions");
    }
  }, [selectedPeriod]);

  useEffect(() => {
    fetchData();
  }, [selectedPeriod, fetchData]);

  const handleDelete = (row) => {
    const id = row.emp_deduction_id;
    if (!id) return toast.error("ID not found");

    Swal.fire({
      title: "Are you sure?",
      text: `Delete deduction for "${row.full_name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#1071b9",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteEmployeeDeduction(id);
          fetchData();
          toast.success("Deduction deleted successfully");
        } catch (err) {
          const msg = err.response?.data?.message || "Failed to delete deduction";
          toast.error(msg);
        }
      }
    });
  };

  const handleEdit = (row) => {
    setSelectedRow(row);
    setShowEditModal(true);
  };

  const handleShowRecap = () => {
    if (!selectedPeriod) return;
    const recapMap = {};
    data.forEach((item) => {
      const name = item.full_name || "Unknown";
      const amount = parseFloat(item.amount || 0);
      if (!recapMap[name]) recapMap[name] = { full_name: name, total_amount: 0 };
      recapMap[name].total_amount += amount;
    });
    setRecapData(Object.values(recapMap));
    setShowRecapModal(true);
  };

  const renderColumnsWithPage = (currentPage, perPage) => [
    {
      name: "#",
      selector: (row, index) => (currentPage - 1) * perPage + index + 1,
      width: "50px",
    },
    {
      name: "Employee Name",
      selector: (row) => row.full_name || "Unknown",
    },
    {
      name: "Deduction",
      selector: (row) => row.deduction_name || "Unknown",
    },
    {
      name: "Amount",
      selector: (row) => `Rp ${parseFloat(row.amount).toLocaleString("id-ID")}`,
    },
    {
      name: "Effective Date",
      selector: (row) => row.effective_date,
    },
    {
      name: "End Date",
      selector: (row) => row.end_date,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button className="btn btn-sm btn-warning text-white" onClick={() => handleEdit(row)}>
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(row)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),
    },
  ];

  const formatRange = (startStr, endStr) => {
    const start = new Date(startStr);
    const end = new Date(endStr);
    const startFormatted = start.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
    });
    const endFormatted = end.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
    });
    const year = end.getFullYear();
    return `${startFormatted} – ${endFormatted} ${year}`;
  };

  return (
    <div className="container mx-auto p-1">
      <Table
        title="Employee Deduction"
        data={data}
        renderColumnsWithPage={renderColumnsWithPage}
        showAddButton={true}
        onAdd={() => setShowAddModal(true)}
        customControls={
          <div className="d-flex align-items-center gap-3">
            {selectedPeriod && (
              <button
                className="btn btn-sm btn-success"
                style={{ minWidth: "180px" }}
                onClick={handleShowRecap}
              >
                Recapitulation
              </button>
            )}
            <select
              className="form-select form-select-sm"
              style={{ minWidth: "250px" }}
              value={selectedPeriod?.period_id || ""}
              onChange={(e) => {
                const selected = periods.find(
                  (p) => p.period_id === parseInt(e.target.value)
                );
                setSelectedPeriod(selected || null);
              }}
            >
              <option value="">Select Period</option>
              {periods.map((p) => (
                <option key={p.period_id} value={p.period_id}>
                  {formatRange(p.start_date, p.end_date)}
                </option>
              ))}
            </select>
          </div>
        }
      />

      {showAddModal && (
        <AddModal
          selectedPeriod={selectedPeriod}
          onClose={() => {
            setShowAddModal(false);
            fetchData();
          }}
        />
      )}

      {showEditModal && selectedRow && (
        <EditModal
          data={selectedRow}
          onClose={() => {
            setShowEditModal(false);
            setSelectedRow(null);
            fetchData();
          }}
        />
      )}

      {showRecapModal && (
        <RecapModal
          recap={recapData}
          onClose={() => setShowRecapModal(false)}
        />
      )}
    </div>
  );
}
