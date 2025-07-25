// components/employee/chart/attendance-pie
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = {
  Present: "#4e73df",
  Sick: "#1cc88a",
  Leave: "#f6c23e",
  Absent: "#e74a3b",
};

export default function AttendancePieChart({ data, height = 300 }) {
  const chartData = Object.entries(data || {}).map(([key, value]) => ({
    name: key,
    value,
    color: COLORS[key] || "#8884d8",
  }));

  const total = chartData.reduce((sum, entry) => sum + entry.value, 0);

  if (chartData.length === 0) return <p>No attendance data available.</p>;

  return (
    <div className="card shadow-sm rounded-4 p-4">
      <h6 className="fw-semibold mb-3" style={{ fontSize: "0.95rem" }}>
        My Attendance
      </h6>
      <hr className="mt-0 mb-4" />

      <div className="d-flex align-items-center">
        {/* Pie Chart */}
        <div style={{ width: "60%", height }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [
                  `${value} ${value === 1 ? "day" : "days"}`,
                  name,
                ]}
                contentStyle={{ fontSize: "0.75rem" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="ms-3" style={{ width: "40%" }}>
          {chartData.map((entry, index) => {
            const percent =
              total > 0 ? ((entry.value / total) * 100).toFixed(0) : 0;
            return (
              <div
                key={index}
                className="d-flex align-items-center mb-1"
                style={{ fontSize: "0.8rem" }}
              >
                <span
                  className="me-2"
                  style={{
                    display: "inline-block",
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: entry.color,
                  }}
                ></span>
                <span className="me-1 fw-semibold">
                  {entry.value} {entry.name}
                </span>
                <span className="text-muted">({percent}%)</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
