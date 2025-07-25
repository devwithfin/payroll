// components/attendance/live-clock
import React, { useState, useEffect } from "react";

const LiveClock = ({ className = "", style = {} }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (num) => String(num).padStart(2, "0");
  const formattedTime = `${formatTime(time.getHours())}:${formatTime(
    time.getMinutes()
  )}:${formatTime(time.getSeconds())}`;

  return (
    <div
      className={`text-center ${className}`}
      style={{
        fontSize: "36px",
        fontWeight: "bold",
        color: "#1f1f1f",
        letterSpacing: "2px",
        ...style,
      }}
    >
      {formattedTime}
    </div>
  );
};

export default LiveClock;
