import { useEffect, useState } from "react";
import { getSummaryEmployee } from "../../services/summaryEmployee";
import SummaryCard from "../../components/employee/SummaryCard";
import PieChart from "../../components/employee/chart/PieChart";

export default function DashboardEmployee() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    getSummaryEmployee().then((res) => setSummary(res.data));
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    if (hour < 20) return "Good Evening";
    return "Good Night";
  };

  if (!summary) return <p>Loading...</p>;

  return (
    <div className="p-4 space-y-4">
      <h5 className="fw-semibold">{getGreeting()}, welcome back!</h5>

      {/* Summary Cards */}
      <div className="row g-3">
        <div className="col-md-4">
          <SummaryCard
            title="Total Attendance"
            value={
              summary.summary.total_attendance !== undefined
                ? summary.summary.total_attendance.toLocaleString()
                : "-"
            }
            change={+1}
            changeText="this week"
          />
        </div>
        <div className="col-md-4">
          <SummaryCard
            title="Overtime Hour"
            value={
              summary.summary.overtime_hour !== undefined
                ? summary.summary.overtime_hour + "h"
                : "-"
            }
            change={+2}
            changeText="this week"
          />
        </div>
        <div className="col-md-4">
          <SummaryCard
            title="Last Salary"
            value={
              summary.summary.last_salary !== undefined
                ? "Rp " +
                  Number(summary.summary.last_salary).toLocaleString("id-ID")
                : "-"
            }
            change={0}
            changeText="last month"
          />
        </div>
      </div>

      {/* Pie Chart */}
      <div className="row mt-4">
        <div className="col-md-6">
          <h6 className="fw-semibold mb-3">Attendance Status</h6>
          <PieChart data={summary.attendance_status_chart || []} />
        </div>
      </div>

      {/* Attendance Table */}
      <div className="mt-5">
        <h6 className="fw-semibold mb-3">Recent Attendance</h6>
        <div className="table-responsive">
          <table className="table table-bordered table-sm">
            <thead className="table-light">
              <tr>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody>
              {summary.attendance_table?.length > 0 ? (
                summary.attendance_table.map((item, index) => (
                  <tr key={index}>
                    <td>{item.date}</td>
                    <td>{item.start_time}</td>
                    <td>{item.end_time}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    No attendance data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
