// components/hr/chart/attendance-bar
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const STATUS_COLORS = {
  Present: "#28a745",
  Sick: "#ffc107",
  Leave: "#17a2b8",
  Absent: "#dc3545",
};

export default function AttendanceBarChart({ data = [], height = 300 }) {
  const statuses = ["Present", "Sick", "Leave", "Absent"];

  return (
    <div className="card shadow-sm rounded-4 p-4">
      <h6 className="fw-semibold mb-3" style={{ fontSize: "0.95rem" }}>
        Attendance Summary
      </h6>
      <hr className="mt-0 mb-4" />
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} barCategoryGap="15%">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" />
          <YAxis allowDecimals={false} />
          <Tooltip formatter={(value) => `${value} days`} />
          <Legend />
          {statuses.map((status) => (
            <Bar
              key={status}
              dataKey={status}
              fill={STATUS_COLORS[status]}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
