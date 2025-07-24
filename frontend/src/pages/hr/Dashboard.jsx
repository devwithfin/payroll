import { useEffect, useState } from "react";
import { getSummaryHR } from "../../services/summaryHR";
import SummaryCard from "../../components/hr/SummaryCard";
import PieChart from "../../components/hr/chart/PieChart";
import BarChart from "../../components/hr/chart/BarChart";

export default function DashboardHR() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    getSummaryHR().then((res) => setSummary(res.data));
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
        <div className="col-md-3">
          <SummaryCard
            title="Total Employees"
            value={summary.summary.total_employees}
            change={+2}
            changeText="from last month"
          />
        </div>
        <div className="col-md-3">
          <SummaryCard
            title="Total Departments"
            value={summary.summary.total_departments}
            change={0}
            changeText="from last month"
          />
        </div>
        <div className="col-md-3">
          <SummaryCard
            title="Total Positions"
            value={summary.summary.total_positions}
            change={0}
            changeText="from last month"
          />
        </div>
        <div className="col-md-3">
          <SummaryCard
            title="Overtime Requests"
            value={summary.summary.total_pending_overtime}
            change={+1}
            changeText="this period"
          />
        </div>
      </div>

      {/* Charts */}
      <div className="row g-3">
        <div className="col-md-6">
          <PieChart data={summary.employment_status_chart} />
        </div>
        <div className="col-md-6">
          <BarChart data={summary.attendance_summary} />
        </div>
      </div>

      {/* Table Overtime */}
      <div className="mt-4">
        <h6 className="fw-semibold mb-3">Overtime Request History</h6>
        <div className="table-responsive">
          <table className="table table-bordered table-sm">
            <thead className="table-light">
              <tr>
                <th>Full Name</th>
                <th>Overtime Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Approval Status</th>
              </tr>
            </thead>
            <tbody>
              {summary.overtime_table.map((item, index) => (
                <tr key={index}>
                  <td>{item.full_name}</td>
                  <td>{item.overtime_date}</td>
                  <td>{item.start_time}</td>
                  <td>{item.end_time}</td>
                  <td>{item.approval_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table Employee */}
      <div className="mt-4">
        <h6 className="fw-semibold mb-3">Employee List</h6>
        <div className="table-responsive">
          <table className="table table-bordered table-sm">
            <thead className="table-light">
              <tr>
                <th>Full Name</th>
                <th>Department</th>
                <th>Position</th>
                <th>Email</th>
                <th>Join Date</th>
              </tr>
            </thead>
            <tbody>
              {summary.employee_table.map((item, index) => (
                <tr key={index}>
                  <td>{item.full_name}</td>
                  <td>{item.department_name}</td>
                  <td>{item.position_name}</td>
                  <td>{item.email}</td>
                  <td>{item.join_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
