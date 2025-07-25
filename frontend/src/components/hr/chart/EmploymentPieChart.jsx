// components/hr/chart/employment-pie
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#1071B9",  
  "#28a745", 
  "#6c757d", 
];

export default function EmploymentPieChart({ data = {}, height = 300 }) {
  const allowedStatuses = ["Contract", "Permanent", "Intern"];

  const chartData = Object.entries(data)
    .filter(([label]) => allowedStatuses.includes(label))
    .map(([label, value]) => ({
      name: label,
      value,
    }));

  const total = chartData.reduce((sum, d) => sum + d.value, 0);

  if (chartData.length === 0)
    return <p>No employment status data available.</p>;

  return (
    <div className="card shadow-sm rounded-4 p-4">
      <h6 className="fw-semibold mb-3" style={{ fontSize: "0.95rem" }}>
        Employment Status
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
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value} employees`, name]}
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
                    backgroundColor: COLORS[index % COLORS.length],
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
