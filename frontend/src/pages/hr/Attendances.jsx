// pages/hr/attendances
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Table from "../../components/common/Table";
import { getAllAttendances } from "../../services/attendanceService";
import { getAllPayrollPeriods } from "../../services/payrollPeriodService";
import RecapModal from "../../components/modals/attendance/RecapModal";

export default function Attendances() {
  const [attendance, setAttendances] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [showRecapModal, setShowRecapModal] = useState(false);
  const [recapData, setRecapData] = useState([]);

  useEffect(() => {
    getAllPayrollPeriods()
      .then((res) => {
        const sorted = res.data.data.sort(
          (a, b) => new Date(a.start_date) - new Date(b.start_date)
        );
        setPeriods(sorted);
      })
      .catch(() => toast.error("Failed to load periods"));
  }, []);

  useEffect(() => {
    if (selectedPeriod) {
      fetchAttendances();
    } else {
      setAttendances([]);
    }
  }, [selectedPeriod]);

  const fetchAttendances = async () => {
    try {
      const response = await getAllAttendances();
      const { start_date, end_date } = selectedPeriod;
      const filtered = response.data.data.filter((item) => {
        const date = new Date(item.attendance_date);
        return date >= new Date(start_date) && date <= new Date(end_date);
      });
      setAttendances(filtered);
    } catch {
      toast.error("Failed to fetch attendance data");
    }
  };

  const handleShowRecap = () => {
    if (!selectedPeriod) return;

    const recapMap = {};

    attendance.forEach((item) => {
      const name = item.full_name;
      const status = item.status;
      if (!recapMap[name]) {
        recapMap[name] = {
          full_name: name,
          Present: 0,
          Sick: 0,
          Leave: 0,
          Absent: 0,
        };
      }

      if (recapMap[name][status] !== undefined) {
        recapMap[name][status]++;
      }
    });

    setRecapData(Object.values(recapMap));
    setShowRecapModal(true);
  };

  const renderStatusBadge = (status) => {
    const val = status?.toLowerCase();
    let bgColor = "#6c757d";

    if (val === "present") bgColor = "#28a745";
    else if (val === "sick") bgColor = "#f0ad4e";
    else if (val === "leave") bgColor = "#17a2b8";
    else if (val === "absent") bgColor = "#dc3545";

    return (
      <span
        className="badge text-white text-capitalize text-center"
        style={{
          backgroundColor: bgColor,
          minWidth: "100px",
          fontSize: "0.9rem",
          padding: "0.4rem",
        }}
      >
        {status}
      </span>
    );
  };

  const renderColumnsWithPage = (currentPage, perPage) => [
    {
      name: "#",
      selector: (row, index) => (currentPage - 1) * perPage + index + 1,
      width: "50px",
    },
    {
      name: "Employee Name",
      selector: (row) => row.full_name,
      sortable: true,
      width: "480px",
    },
    {
      name: "Check In",
      selector: (row) => row.check_in_time,
      sortable: true,
      width: "120px",
    },
    {
      name: "Check Out",
      selector: (row) => row.check_out_time,
      sortable: true,
      width: "120px",
    },
    {
      name: "Date",
      selector: (row) => row.attendance_date,
      sortable: true,
      width: "100px",
    },
    {
      name: "Status",
      cell: (row) => renderStatusBadge(row.status),
      sortable: true,
      width: "140px",
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
        title="Attendance History"
        data={attendance}
        renderColumnsWithPage={renderColumnsWithPage}
        showAddButton={false}
        customControls={
          <div className="d-flex align-items-center gap-3">
            {selectedPeriod && (
              <button
                className="btn btn-sm btn-success"
                style={{ minWidth: "180px" }}
                onClick={handleShowRecap}
              >
                View Recap
              </button>
            )}
            <select
              className="form-select form-select-sm"
              style={{ minWidth: "250px" }}
              value={selectedPeriod?.period_id || ""}
              onChange={(e) => {
                const period = periods.find(
                  (p) => p.period_id === parseInt(e.target.value)
                );
                setSelectedPeriod(period || null);
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

      {showRecapModal && (
        <RecapModal
          recap={recapData}
          onClose={() => setShowRecapModal(false)}
        />
      )}
    </div>
  );
}
