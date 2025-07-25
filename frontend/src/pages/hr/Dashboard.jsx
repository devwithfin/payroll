// pages/hr/dashboard
import { useEffect, useState } from "react";
import { getProfile } from "../../services/authService";
import { getHRSummary } from "../../services/summaryHR";
import SummaryCard from "../../components/hr/SummaryCard";
import EmploymentPieChart from "../../components/hr/chart/EmploymentPieChart";
import AttendanceBarChart from "../../components/hr/chart/AttendanceBarChart";
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

        const summaryRes = await getHRSummary(employeeId);
        setSummary(summaryRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch HR summary.");
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
    summary: stat,
    employment_status_chart,
    attendance_bar_chart,
    employee_table,
  } = summary;

  const limitedEmployeeTable = (employee_table || []).slice(0, 5);

  const employeeColumns = [
    {
      name: "Full Name",
      selector: (row) => row.full_name,
      sortable: true,
      wrap: true,
    },
    {
      name: "Department",
      selector: (row) => row.department_name,
      sortable: true,
      wrap: true,
    },
    {
      name: "Position",
      selector: (row) => row.position_name,
      sortable: true,
      wrap: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      width: "200px",
      wrap: true,
    },
    {
      name: "Join Date",
      selector: (row) => row.join_date,
      sortable: true,
      wrap: true,
    },
  ];

  return (
    <div className="p-4">
      {/* Greeting */}
      <h4 className="fw-semibold mb-4">
        {getGreeting()},{" "}
        <span style={{ color: "#1071B9" }}>{fullName}!</span>
      </h4>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <SummaryCard title="Total Employees" value={stat.total_employees} />
        </div>
        <div className="col-md-3">
          <SummaryCard title="Total Departments" value={stat.total_departments} />
        </div>
        <div className="col-md-3">
          <SummaryCard title="Total Positions" value={stat.total_positions} />
        </div>
        <div className="col-md-3">
          <SummaryCard title="Pending Overtime" value={stat.total_pending_overtime} />
        </div>
      </div>

      {/* Charts */}
      <div className="row">
        <div className="col-md-6 mb-3">
          <EmploymentPieChart data={employment_status_chart} height={300} />
        </div>
        <div className="col-md-6 mb-3">
          <AttendanceBarChart data={attendance_bar_chart} height={300} />
        </div>
      </div>

      {/* Employee Table (5 newest) */}
      <div className="card shadow-sm rounded-4 mt-4 p-4">
        <h6 className="fw-semibold mb-3" style={{ fontSize: "0.95rem" }}>
          Recently Joined Employees
        </h6>
        <hr className="mt-0 mb-4" />
        <SimpleTable data={limitedEmployeeTable} columns={employeeColumns} />
      </div>
    </div>
  );
}
