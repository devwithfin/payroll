// pages/hr/Attendances.jsx
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Table from "../../components/common/Table";
import {
  getAllAttendances,
  getAttendanceByEmployeeId,
  clockIn,
  clockOut,
} from "../../services/attendanceService";
import { getAllPayrollPeriods } from "../../services/payrollPeriodService";
import RecapModal from "../../components/hr/modals/attendance/RecapModal";
import LiveClock from "../../components/attendance/LiveClock";
import AttendanceTimeline from "../../components/attendance/AttendanceTimeline";
import { useAuthContext } from "../../contexts/AuthContext";

export default function Attendances() {
  const { user } = useAuthContext();
  const [activeTab, setActiveTab] = useState("self");
  const [attendance, setAttendances] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [showRecapModal, setShowRecapModal] = useState(false);
  const [recapData, setRecapData] = useState([]);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const [hasClockedInToday, setHasClockedInToday] = useState(false);
  const [hasClockedOutToday, setHasClockedOutToday] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const time = now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setCurrentTime(time);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getAllPayrollPeriods()
      .then((res) => {
        const sorted = res.data.data.sort(
          (a, b) => new Date(a.start_date) - new Date(b.start_date)
        );
        setPeriods(sorted);
        const today = new Date();
        const active = sorted.find(
          (p) =>
            new Date(p.start_date) <= today && new Date(p.end_date) >= today
        );
        if (active) setSelectedPeriod(active);
      })
      .catch(() => toast.error("Failed to load payroll periods."));
  }, []);

  const fetchAttendances = useCallback(async () => {
    if (!selectedPeriod) return;
    try {
      const response = await getAllAttendances();
      const data = Array.isArray(response.data?.data) ? response.data.data : [];
      const { start_date, end_date } = selectedPeriod;
      const start = new Date(start_date);
      const end = new Date(end_date);
      const filtered = data.filter((item) => {
        const date = new Date(item.attendance_date);
        return date >= start && date <= end;
      });
      setAttendances(filtered);
    } catch (err) {
      console.error("fetch attendances error:", err);
      toast.error("Failed to fetch attendance data.");
    }
  }, [selectedPeriod]);

  const fetchLogs = useCallback(async () => {
    if (!user?.employee?.employee_id) return;
    try {
      const res = await getAttendanceByEmployeeId(user.employee.employee_id);
      const logs = res.data.data || [];
      const today = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 6);
      const filtered = logs.filter((log) => {
        const date = new Date(log.attendance_date);
        return date >= sevenDaysAgo && date <= today;
      });
      const sorted = filtered.sort(
        (a, b) => new Date(b.attendance_date) - new Date(a.attendance_date)
      );
      setAttendanceLogs(sorted);
      const todayStr = today.toISOString().split("T")[0];
      const todayLog = logs.find((log) => log.attendance_date === todayStr);
      setHasClockedInToday(!!todayLog?.check_in_time);
      setHasClockedOutToday(!!todayLog?.check_out_time);
    } catch (err) {
      console.error("Fetch logs error:", err);
      toast.error("Failed to fetch your attendance logs.");
    }
  }, [user]);

  useEffect(() => {
    if (selectedPeriod) {
      fetchAttendances();
    } else {
      setAttendances([]);
    }
  }, [selectedPeriod, fetchAttendances]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const isAllowedCheckOut = () => {
    const [hour, minute] = currentTime.split(":").map(Number);
    return hour > 17 || (hour === 17 && minute >= 0);
  };

  const handleCheckIn = async () => {
    try {
      await clockIn({ employee_id: user.employee.employee_id });
      toast.success(`Clock-in at ${currentTime}`);
      fetchLogs();
      fetchAttendances();
    } catch (err) {
      console.error("Clock-in error:", err);
      toast.error("Clock-in failed");
    }
  };

  const handleCheckOut = async () => {
    if (!isAllowedCheckOut()) {
      toast.error("Clock-out is allowed after 17:00");
      return;
    }
    try {
      await clockOut({ employee_id: user.employee.employee_id });
      toast.success(`Clock-out at ${currentTime}`);
      fetchLogs();
      fetchAttendances();
    } catch {
      toast.error("Clock-out failed");
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

  const today = new Date();
  const weekday = today.toLocaleDateString("en-US", { weekday: "long" });
  const day = today.getDate();
  const month = today.toLocaleDateString("en-US", { month: "long" });
  const year = today.getFullYear();
  const formattedDate = `${weekday}, ${day} ${month} ${year}`;

  const getStatusBadge = (status) => {
    const lower = status?.toLowerCase();
    let bg = "#6c757d";

    if (lower === "present") bg = "#28a745";
    else if (lower === "sick") bg = "#17a2b8";
    else if (lower === "leave") bg = "#ffc107";
    else if (lower === "absent") bg = "#dc3545";

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

  const renderColumnsWithPage = (currentPage, perPage) => [
    {
      name: "#",
      selector: (row, index) => (currentPage - 1) * perPage + index + 1,
      width: "50px",
    },
    { name: "Employee Name", selector: (row) => row.full_name, sortable: true },
    {
      name: "Check In",
      selector: (row) => row.check_in_time || "--:--",
      width: "120px",
    },
    {
      name: "Check Out",
      selector: (row) => row.check_out_time || "--:--",
      width: "120px",
    },
    {
      name: "Date",
      selector: (row) => row.attendance_date,
      sortable: true,
      width: "120px",
    },
    {
      name: "Status",
      cell: (row) => getStatusBadge(row.status),
      width: "120px",
    },
  ];

  return (
    <div className="container p-1">
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "self" ? "active" : ""}`}
            onClick={() => setActiveTab("self")}
          >
            My Attendance
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "recap" ? "active" : ""}`}
            onClick={() => setActiveTab("recap")}
          >
            Recapitulation
          </button>
        </li>
      </ul>

      {activeTab === "recap" && (
        <>
          <Table
            title="Attendance Recapitulation"
            data={attendance}
            renderColumnsWithPage={renderColumnsWithPage}
            showAddButton={false}
            customControls={
              <div className="d-flex align-items-center gap-3">
                {selectedPeriod && (
                  <button
                    className="btn btn-sm btn-success"
                    onClick={handleShowRecap}
                  >
                    Recapitulation
                  </button>
                )}
                <select
                  className="form-select form-select-sm"
                  value={selectedPeriod?.period_id || ""}
                  onChange={(e) => {
                    const period = periods.find(
                      (p) => p.period_id === parseInt(e.target.value)
                    );
                    setSelectedPeriod(period || null);
                  }}
                >
                  <option value="">Select Period</option>
                  {periods.map((p) => {
                    const start = new Date(p.start_date);
                    const end = new Date(p.end_date);
                    const formatted = `${start.toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                    })} - ${end.toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}`;
                    return (
                      <option key={p.period_id} value={p.period_id}>
                        {formatted}
                      </option>
                    );
                  })}
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
        </>
      )}

      {activeTab === "self" && (
        <>
          <h2 className="fs-3 fw-bold mb-1">Live Attendance</h2>
          <p className="text-muted mb-3">📅 {formattedDate}</p>
          <LiveClock />
          <AttendanceTimeline currentTime={currentTime} />
          <div className="d-flex gap-3 mt-4">
            <button
              className="btn btn-success flex-fill"
              onClick={handleCheckIn}
              disabled={hasClockedInToday}
            >
              Clock In
            </button>
            <button
              className="btn btn-primary flex-fill"
              onClick={handleCheckOut}
              disabled={
                !hasClockedInToday || !isAllowedCheckOut() || hasClockedOutToday
              }
            >
              Clock Out
            </button>
          </div>

          <div className="mt-5 pt-4 border-top">
            <h5 className="fw-semibold mb-3">Attendance Logs</h5>
            {attendanceLogs.length === 0 ? (
              <p className="text-muted">No attendance records yet.</p>
            ) : (
              <ul className="list-group">
                {attendanceLogs.map((log) => (
                  <li
                    key={log.attendance_id}
                    className="list-group-item d-flex justify-content-between"
                  >
                    <div>
                      <strong>{log.attendance_date}</strong>
                      <div className="text-muted small">
                        {log.status} | In: {log.check_in_time || "--:--"} | Out:{" "}
                        {log.check_out_time || "--:--"}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}
