// pages/hr/attendances
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Table from "../../components/common/Table";
import {
  getAllAttendances,
  getAttendanceByEmployeeId,
} from "../../services/attendanceService";
import { getAllPayrollPeriods } from "../../services/payrollPeriodService";
import RecapModal from "../../components/hr/modals/attendance/RecapModal";
import LiveClock from "../../components/attendance/LiveClock";
import AttendanceTimeline from "../../components/attendance/AttendanceTimeline";
import { useAuthContext } from "../../contexts/AuthContext";

export default function Attendances() {
  const { user } = useAuthContext();
  const [activeTab, setActiveTab] = useState("self");

  // Recap
  const [attendance, setAttendances] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [showRecapModal, setShowRecapModal] = useState(false);
  const [recapData, setRecapData] = useState([]);

  // Self Attendance (HR)
  const [status, setStatus] = useState("none");
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [attendanceLogs, setAttendanceLogs] = useState([]);

  // ⏱️ Clock realtime
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const time = now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setCurrentTime(time);
    };

    update();
    const interval = setInterval(update, 1000);
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
        const activePeriod = sorted.find((p) => {
          const start = new Date(p.start_date);
          const end = new Date(p.end_date);
          return today >= start && today <= end;
        });

        if (activePeriod) {
          setSelectedPeriod(activePeriod);
        }
      })
      .catch(() => toast.error("Failed to load periods"));
  }, []);

  const fetchAttendances = useCallback(async () => {
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
  }, [selectedPeriod]);

  useEffect(() => {
    if (selectedPeriod) {
      fetchAttendances();
    } else {
      setAttendances([]);
    }
  }, [selectedPeriod, fetchAttendances]);

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

  useEffect(() => {
    if (!user || !user.employee?.employee_id) return;

    const fetchLogs = async () => {
      try {
        const id = user.employee.employee_id;
        const res = await getAttendanceByEmployeeId(id);

        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 6);

        const filtered = res.data.data.filter((log) => {
          const logDate = new Date(log.attendance_date);
          return logDate >= sevenDaysAgo && logDate <= today;
        });

        const sorted = filtered.sort(
          (a, b) => new Date(b.attendance_date) - new Date(a.attendance_date)
        );

        setAttendanceLogs(sorted);
      } catch (err) {
        if (err.response?.status !== 401) {
          toast.error("Failed to load attendance data");
        }
      }
    };

    fetchLogs();
  }, [user]);

  const isAllowedCheckOut = () => {
    const [hour, minute] = currentTime.split(":").map(Number);
    return hour > 17 || (hour === 17 && minute >= 0);
  };

  const nowTime = () => currentTime;

  const handleCheckIn = () => {
    const time = nowTime();
    setCheckInTime(time);
    setStatus("checkedIn");
    toast.success(`Checked in at ${time}`);
  };

  const handleCheckOut = () => {
    if (!isAllowedCheckOut()) {
      toast.error("Clock-out can only be done after 17:00");
      return;
    }

    const time = nowTime();
    setCheckOutTime(time);
    setStatus("done");
    toast.success(`Checked out at ${time}`);
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

  const today = new Date();
  const day = today.toLocaleDateString("en-US", { weekday: "long" });
  const date = today.getDate();
  const month = today.toLocaleDateString("en-US", { month: "long" });
  const year = today.getFullYear();

  const formattedDate = `${day}, ${date} ${month} ${year}`;

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
              disabled={status !== "none" || isAllowedCheckOut()}
            >
              Clock In
            </button>
            <button
              className="btn btn-primary flex-fill"
              onClick={handleCheckOut}
              disabled={status !== "checkedIn" || !isAllowedCheckOut()}
            >
              Clock Out
            </button>
          </div>

          <div className="mt-5 pt-4 border-top">
            <h5 className="fw-semibold mb-3">Log Attendance</h5>
            {attendanceLogs.length === 0 ? (
              <p className="text-muted">No attendance records found.</p>
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
