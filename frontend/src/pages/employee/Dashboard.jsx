// pages/hr/dashboard
import { useEffect, useState } from "react";
import { getProfile } from "../../services/authService";
import { getEmployeeSummary } from "../../services/summaryEmployee";
import SummaryCard from "../../components/employee/SummaryCard";
import AttendancePieChart from "../../components/employee/chart/AttendancePieChart";
import SimpleTable from "../../components/common/SimpleTable";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const profileRes = await getProfile();
        const employee = profileRes.data?.user?.employee;
        const employeeId = employee?.employee_id;
        const name = employee?.full_name;

        if (!employeeId || !name) throw new Error("Invalid employee profile.");
        setFullName(name);

        const summaryRes = await getEmployeeSummary(employeeId);
        setSummary(summaryRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch employee summary.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    if (hour < 20) return "Good Evening";
    return "Good Night";
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!summary) return <p>No summary data found.</p>;

  const {
    summary: summaryData,
    attendance_summary,
    attendance_chart = [],
  } = summary;

  // Ambil 5 data terakhir dari attendance_chart
  const limitedAttendance = [...attendance_chart]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const columns = [
    { name: "Date", selector: (row) => row.date, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
    { name: "Check In", selector: (row) => row.check_in_time || "-" },
    { name: "Check Out", selector: (row) => row.check_out_time || "-" },
  ];

  return (
    <div className="p-4">
      {/* Greeting */}
      <h4 className="fw-semibold mb-4">
        {getGreeting()}, <span style={{ color: "#1071B9" }}>{fullName}!</span>
      </h4>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <SummaryCard
            title="Total Attendance"
            value={
              summaryData?.total_attendance !== undefined
                ? summaryData.total_attendance.toLocaleString()
                : "-"
            }
          />
        </div>
        <div className="col-md-4">
          <SummaryCard
            title="Overtime Hour"
            value={
              summaryData?.total_overtime_hours !== undefined
                ? summaryData.total_overtime_hours + "h"
                : "-"
            }
          />
        </div>
        <div className="col-md-4">
          <SummaryCard
            title="Last Salary"
            value={
              summaryData?.last_salary_received !== undefined
                ? "Rp " +
                  Number(summaryData.last_salary_received).toLocaleString("id-ID")
                : "-"
            }
          />
        </div>
      </div>

      {/* Attendance Table & Pie Chart */}
      <div className="row align-items-stretch">
        <div className="col-md-7 mb-3 mb-md-0">
          <div
            className="card shadow-sm rounded-4 p-4 h-100"
            style={{ minHeight: "320px" }}
          >
            <h6 className="fw-semibold mb-3" style={{ fontSize: "0.95rem" }}>
              Recent Attendance
            </h6>
            <hr className="mt-0 mb-4" />
            <SimpleTable data={limitedAttendance} columns={columns} />
          </div>
        </div>
        <div className="col-md-5">
          <AttendancePieChart data={attendance_summary || {}} height={320} />
        </div>
      </div>
    </div>
  );
}
