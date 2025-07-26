// pages/finance/payroll-transfer
import React, { useEffect, useState, useCallback } from "react";
import Table from "../../components/common/Table";
import {
  getAllPayrollPeriods,
  getPayrollDetailsByPeriod,
  transferPayroll,
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

const getPaidBadge = (isPaid) => {
  const bg = isPaid ? "#28a745" : "#ffc107";
  const label = isPaid ? "Paid" : "Unpaid";

  return (
    <span
      className="badge text-white text-center"
      style={{
        backgroundColor: bg,
        minWidth: "80px",
        fontSize: "0.85rem",
        padding: "0.4rem",
      }}
    >
      {label}
    </span>
  );
};

export default function PayrollTransfer() {
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
      setData(res.data?.data || []);
    } catch (err) {
      toast.error("Failed to load payroll data");
      console.error(err);
    }
  }, [selectedPeriod]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleTransfer = async () => {
    if (!selectedPeriod) return;
    setLoading(true);
    try {
      await transferPayroll(selectedPeriod.period_id);
      await fetchData();
      toast.success("Payroll marked as paid successfully");
    } catch (err) {
      const failedList = err.response?.data?.data || [];
      if (failedList.length > 0) {
        const names = failedList.map((e) => `• ${e.full_name}`).join("\n");
        toast.error(`Failed: Employees missing bank info:\n${names}`);
      } else {
        toast.error("Failed to transfer payroll");
      }
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
      selector: (row) => row.employee?.full_name || "-",
    },
    {
      name: "Net Salary",
      selector: (row) =>
        `Rp ${parseFloat(row.net_salary || 0).toLocaleString("id-ID")}`,
    },
    {
      name: "Bank",
      selector: (row) => row.employee?.bank_name || "-",
    },
    {
      name: "Account No.",
      selector: (row) => row.employee?.bank_account_number || "-",
    },
    {
      name: "Status",
      selector: (row) => getStatusBadge(row.payroll_status),
    },
    {
      name: "Paid",
      selector: (row) => getPaidBadge(row.is_paid),
    },
    {
      name: "Payment Date",
      selector: (row) =>
        row.payment_date
          ? new Date(row.payment_date).toLocaleDateString("id-ID")
          : "-",
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

  const canTransfer =
    data.length > 0 &&
    data.every((p) => p.payroll_status === "Final") &&
    data.some((p) => !p.is_paid) &&
    data.every(
      (p) => p.employee?.bank_name && p.employee?.bank_account_number
    );

  return (
    <div className="container mx-auto p-1">
      <Table
        title="Payroll Transfer"
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
              disabled={!canTransfer || loading}
              onClick={handleTransfer}
            >
              {loading ? "Processing..." : "Mark All as Paid"}
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
