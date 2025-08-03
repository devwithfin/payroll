// pages/hr/payroll-draft
import React, { useState, useEffect, useCallback } from "react";
import Table from "../../components/common/Table";
import {
  getAllPayrollPeriods,
  getPayrollDetailsByPeriod,
  draftPayroll,
} from "../../services/payrollPeriodService";
import { toast } from "react-toastify";

const getStatusBadge = (status) => {
  const bgMap = {
    draft: "#ffc107",
    final: "#28a745",
  };
  const bg = bgMap[status?.toLowerCase()] || "#6c757d";

  return (
    <span
      className="badge text-white text-capitalize text-center"
      style={{
        backgroundColor: bg,
        minWidth: "100px",
        fontSize: "0.9rem",
        padding: "0.4rem",
      }}
    >
      {status || "Unknown"}
    </span>
  );
};

export default function DraftPayroll() {
  const [data, setData] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [loading, setLoading] = useState(false);

   useEffect(() => {
      getAllPayrollPeriods()
        .then((res) => {
          const list = res.data?.data || [];
          setPeriods(list);
          if (list.length > 0) {
            setSelectedPeriod(list[0]);
          }
        })
        .catch((err) => {
          toast.error("Failed to load periods");
          console.error(err);
        });
    }, []);

  const fetchData = useCallback(async () => {
    if (!selectedPeriod) return;
    try {
      const res = await getPayrollDetailsByPeriod(selectedPeriod.period_id);
      setData(res.data.data || []);
      console.log(res.data.data);
      
    } catch (err) {
      console.error("Failed to fetch payroll details", err);
      setData([]);
    }
  }, [selectedPeriod]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleProcessDraft = async () => {
    if (!selectedPeriod) return;
    setLoading(true);
    try {
      await draftPayroll(selectedPeriod.period_id);
      await fetchData();
      toast.success("Draft payroll processed successfully");
    } catch (err) {
      console.error("Failed to process draft payroll", err);
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Failed to process payroll";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const renderColumnsWithPage = (currentPage, perPage) => [
    {
      name: "#",
      selector: (row, index) => (currentPage - 1) * perPage + index + 1,
      width: "50px",
    },
    {
      name: "Employee",
      selector: (row) => row.employee.full_name || "-",
    },
    {
      name: "Base Salary",
      selector: (row) =>
        `Rp ${parseFloat(row.base_salary || 0).toLocaleString("id-ID")}`,
    },
    {
      name: "Allowances",
      selector: (row) =>
        `Rp ${parseFloat(row.total_allowances || 0).toLocaleString("id-ID")}`,
    },
    {
      name: "Overtime",
      selector: (row) =>
        `Rp ${parseFloat(row.total_overtime_pay || 0).toLocaleString("id-ID")}`,
    },
    {
      name: "Gross Salary",
      selector: (row) =>
        `Rp ${parseFloat(row.gross_salary || 0).toLocaleString("id-ID")}`,
    },
    {
      name: "Deductions",
      selector: (row) =>
        `Rp ${parseFloat(row.total_deductions || 0).toLocaleString("id-ID")}`,
    },
    {
      name: "Net Salary",
      selector: (row) =>
        `Rp ${parseFloat(row.net_salary || 0).toLocaleString("id-ID")}`,
    },
    {
      name: "Status",
      selector: (row) => getStatusBadge(row.payroll_status),
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

  const isButtonDisabled =
    !selectedPeriod ||
    loading ||
    (data.length > 0 && data[0].payroll_status?.toLowerCase() === "final");

  return (
    <div className="container mx-auto p-1">
      <Table
        title="Payroll Draft"
        data={data}
        renderColumnsWithPage={renderColumnsWithPage}
        showAddButton={false}
        customControls={
          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-sm"
              style={{
                minWidth: "180px",
                backgroundColor: "#1071b9",
                color: "#fff",
                border: "none",
              }}
              disabled={isButtonDisabled}
              onClick={handleProcessDraft}
            >
              {loading ? "Processing..." : "Draft Process"}
            </button>

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
    </div>
  );
}
