// pages/hr/attendance
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LiveClock from "../../components/attendance/LiveClock";
import AttendanceTimeline from "../../components/attendance/AttendanceTimeline";
import { useAuthContext } from "../../contexts/AuthContext";
import {
  getAttendanceByEmployeeId,
  clockIn,
  clockOut,
} from "../../services/attendanceService";

const Attendances = () => {
  const { user } = useAuthContext();
  const [status, setStatus] = useState("none");  
  const [currentTime, setCurrentTime] = useState("00:00");
  const [attendanceLogs, setAttendanceLogs] = useState([]);

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

  const fetchLogs = async () => {
    if (!user?.employee?.employee_id) {
      toast.error("Your account is not linked to an employee profile.");
      return;
    }

    try {
      const res = await getAttendanceByEmployeeId(user.employee.employee_id);
      const data = res.data.data;

      if (!Array.isArray(data)) {
        console.warn("Invalid attendance data format:", res);
        return;
      }

      const today = new Date();
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 6);

      const filteredLogs = data.filter((log) => {
        const logDate = new Date(log.attendance_date);
        return logDate >= sevenDaysAgo && logDate <= today;
      });

      const sortedLogs = filteredLogs.sort(
        (a, b) => new Date(b.attendance_date) - new Date(a.attendance_date)
      );

      setAttendanceLogs(sortedLogs);

      const todayStr = today.toISOString().split("T")[0];
      const todayLog = data.find(
        (log) => log.attendance_date === todayStr
      );

      if (todayLog) {
        if (todayLog.check_in_time && !todayLog.check_out_time) {
          setStatus("checkedIn");
        } else if (todayLog.check_in_time && todayLog.check_out_time) {
          setStatus("done");
        } else {
          setStatus("none");
        }
      } else {
        setStatus("none");
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setAttendanceLogs([]);
        setStatus("none");
      } else {
        toast.error("Failed to fetch attendance logs.");
        console.error("Fetch logs error:", err);
      }
    }
  };

  useEffect(() => {
    if (user?.employee?.employee_id) {
      fetchLogs();
    }
  }, [user]);

  const isAllowedToCheckOut = () => {
    const [hour, minute] = currentTime.split(":").map(Number);
    return hour > 17 || (hour === 17 && minute >= 0);
  };

  const handleCheckIn = async () => {
    try {
      await clockIn({ employee_id: user.employee.employee_id });
      toast.success(`Clock-in at ${currentTime}`);
      setStatus("checkedIn");
      fetchLogs();
    } catch (err) {
      toast.error("Failed to Clock In.");
      console.error("Clock-in error:", err);
    }
  };

  const handleCheckOut = async () => {
    if (!isAllowedToCheckOut()) {
      toast.error("You can only Clock-out after 17:00.");
      return;
    }
    try {
      await clockOut({ employee_id: user.employee.employee_id });
      toast.success(`Clock-out at ${currentTime}`);
      setStatus("done");
      fetchLogs();
    } catch (err) {
      toast.error("Failed to Clock Out.");
      console.error("Clock-out error:", err);
    }
  };

const today = new Date();
const weekday = today.toLocaleDateString("en-US", { weekday: "long" });
const day = today.getDate();
const month = today.toLocaleDateString("en-US", { month: "long" });
const year = today.getFullYear();
const formattedDate = `${weekday}, ${day} ${month} ${year}`;


  return (
    <div className="container mt-4">
      <h2 className="fs-3 fw-bold mb-1">Live Attendance</h2>
      <p className="text-muted mb-3">{formattedDate}</p>

      <LiveClock />
      <AttendanceTimeline currentTime={currentTime} />

      {!user?.employee?.employee_id && (
        <div className="alert alert-warning mt-4">
          This account is not linked to any employee. Attendance is not available.
        </div>
      )}

      <div className="d-flex gap-3 mt-4">
        <button
          className="btn btn-success flex-fill"
          onClick={handleCheckIn}
          disabled={
            !user?.employee?.employee_id || status !== "none"
          }
        >
          Clock In
        </button>
        <button
          className="btn btn-primary flex-fill"
          onClick={handleCheckOut}
          disabled={
            !user?.employee?.employee_id || status !== "checkedIn" || !isAllowedToCheckOut()
          }
        >
          Clock Out
        </button>
      </div>

      <div className="mt-5 pt-4 border-top">
        <h5 className="fw-semibold mb-3">Attendance Log</h5>
        {attendanceLogs.length === 0 ? (
          <p className="text-muted">No attendance records available.</p>
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
    </div>
  );
};

export default Attendances;
