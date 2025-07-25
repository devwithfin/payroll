// components/attendance/attendance-timeline
import React, { useEffect, useState } from "react";

const AttendanceTimeline = () => {
  const startHour = 8;
  const endHour = 17;

  const [currentTime, setCurrentTime] = useState("00:00");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setCurrentTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  const getProgressPercent = () => {
    if (!currentTime || !currentTime.includes(":")) return 0;

    const [currHour, currMin] = currentTime.split(":").map(Number);
    const totalMinutes = (currHour - startHour) * 60 + currMin;
    const totalWorkingMinutes = (endHour - startHour) * 60;
    const percent = Math.min((totalMinutes / totalWorkingMinutes) * 100, 100);
    return percent < 0 ? 0 : percent;
  };

  const progressPercent = getProgressPercent();

  return (
    <div className="d-flex align-items-center gap-3 mt-4">
      <div className="text-end" style={{ width: "80px" }}>
        <div className="small text-muted mb-1">Clock In</div>
        <div className="fw-bold">08:00</div>
      </div>

      <div
        className="flex-fill position-relative"
        style={{ height: "10px", background: "#dee2e6", borderRadius: "8px" }}
      >
        <div
          className="position-absolute top-0 start-0 h-100 bg-success"
          style={{
            width: `${progressPercent}%`,
            borderRadius: "8px",
            transition: "width 0.5s ease",
          }}
        />
      </div>

      <div style={{ width: "80px" }}>
        <div className="small text-muted mb-1">Clock Out</div>
        <div className="fw-bold">17:00</div>
      </div>
    </div>
  );
};

export default AttendanceTimeline;
