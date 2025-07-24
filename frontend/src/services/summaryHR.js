// src/services/summaryHR.js

export const getSummaryHR = () => {
  return Promise.resolve({
    data: {
      period: {
        name: "Juli 2025",
        start_date: "2025-06-26",
        end_date: "2025-07-25"
      },
      summary: {
        total_employees: 3,
        total_departments: 10,
        total_positions: 14,
        total_pending_overtime: 1
      },
      employment_status_chart: {
        Permanent: 3,
        Contract: 0,
        Intern: 0
      },
      attendance_summary: {
        Present: 58,
        Sick: 2,
        Leave: 1,
        Absent: 0
      },
      attendance_chart: [
        {
          date: "2025-06-26",
          check_in_time: "08:10:55",
          check_out_time: "17:00:29",
          status: "Present"
        },
        {
          date: "2025-06-26",
          check_in_time: "08:01:42",
          check_out_time: "17:06:17",
          status: "Present"
        },
        
        {
          date: "2025-07-24",
          check_in_time: "10:23:45",
          check_out_time: null,
          status: "Present"
        }
      ],
      overtime_table: [
        {
          full_name: "Alfiansyah Wicaksono",
          overtime_date: "2025-07-25",
          start_time: "17:00:00",
          end_time: "19:00:00",
          approval_status: "Pending"
        }
      ],
      employee_table: [
        {
          full_name: "Alfiansyah Wicaksono",
          department_name: "Engineering",
          position_name: "Software Engineer",
          email: "alfiansyahcahyow@gmail.com",
          join_date: "2024-09-02"
        },
        {
          full_name: "Dewi Puspita",
          department_name: "Finance",
          position_name: "Finance Analyst",
          email: "puspitadewi@gmail.com",
          join_date: "2020-02-02"
        },
        {
          full_name: "Bayu Anggara",
          department_name: "Human Resources",
          position_name: "HR Generalist",
          email: "bayuanggara@gmail.com",
          join_date: "2020-01-01"
        }
      ]
    }
  });
};
