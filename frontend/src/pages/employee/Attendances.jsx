import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LiveClock from "../../components/attendance/LiveClock";
import AttendanceTimeline from "../../components/attendance/AttendanceTimeline";
import { useAuthContext } from "../../contexts/AuthContext";
import { getAttendanceByEmployeeId } from "../../services/attendanceService";

const AttendancePage = () => {
  const { user } = useAuthContext();
  const [status, setStatus] = useState("none");
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
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

const today = new Date();
const day = today.toLocaleDateString("en-US", { weekday: "long" });
const date = today.getDate();  
const month = today.toLocaleDateString("en-US", { month: "long" });
const year = today.getFullYear();

const formattedDate = `${day}, ${date} ${month} ${year}`;


  return (
    <div className="container mt-4">
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

      {/* Log Attendance Section */}
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
    </div>
  );
};

export default AttendancePage;
