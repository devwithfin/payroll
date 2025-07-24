// src/services/summaryEmployee.js

export const getSummaryEmployee = () => {
  return Promise.resolve({
    data: {
      period: {
        name: "Juli 2025",
        start_date: "2025-06-26",
        end_date: "2025-07-25"
      },
      summary: {
        total_attendance: 18,
        total_overtime_hours: 0,
        last_salary_received: 0
      },
      attendance_summary: {
        Present: 18,
        Sick: 1,
        Leave: 0,
        Absent: 0
      },
      attendance_chart: [
        {
          date: "2025-06-26",
          status: "Present",
          check_in_time: "08:12:31",
          check_out_time: "17:08:47"
        },
        {
          date: "2025-06-27",
          status: "Present",
          check_in_time: "08:12:15",
          check_out_time: "17:12:05"
        },
        {
          date: "2025-06-30",
          status: "Present",
          check_in_time: "08:01:30",
          check_out_time: "17:05:35"
        },
        {
          date: "2025-07-01",
          status: "Present",
          check_in_time: "08:00:31",
          check_out_time: "17:10:43"
        },
        {
          date: "2025-07-02",
          status: "Present",
          check_in_time: "08:15:17",
          check_out_time: "17:00:05"
        },
        {
          date: "2025-07-03",
          status: "Sick",
          check_in_time: "08:00:52",
          check_out_time: "17:14:23"
        },
        {
          date: "2025-07-04",
          status: "Present",
          check_in_time: "08:05:31",
          check_out_time: "17:14:17"
        },
        {
          date: "2025-07-07",
          status: "Present",
          check_in_time: "08:03:40",
          check_out_time: "17:15:08"
        },
        {
          date: "2025-07-08",
          status: "Present",
          check_in_time: "08:01:31",
          check_out_time: "17:12:21"
        },
        {
          date: "2025-07-09",
          status: "Present",
          check_in_time: "08:05:06",
          check_out_time: "17:04:32"
        },
        {
          date: "2025-07-10",
          status: "Present",
          check_in_time: "08:03:57",
          check_out_time: "17:04:08"
        },
        {
          date: "2025-07-11",
          status: "Present",
          check_in_time: "08:07:25",
          check_out_time: "17:08:02"
        },
        {
          date: "2025-07-14",
          status: "Present",
          check_in_time: "08:12:15",
          check_out_time: "17:13:41"
        },
        {
          date: "2025-07-15",
          status: "Present",
          check_in_time: "08:00:34",
          check_out_time: "17:00:55"
        },
        {
          date: "2025-07-16",
          status: "Present",
          check_in_time: "08:03:42",
          check_out_time: "17:05:28"
        },
        {
          date: "2025-07-17",
          status: "Present",
          check_in_time: "08:08:22",
          check_out_time: "17:02:20"
        },
        {
          date: "2025-07-18",
          status: "Present",
          check_in_time: "08:00:07",
          check_out_time: "17:02:08"
        },
        {
          date: "2025-07-21",
          status: "Present",
          check_in_time: "08:11:24",
          check_out_time: "17:07:49"
        },
        {
          date: "2025-07-22",
          status: "Present",
          check_in_time: "08:12:02",
          check_out_time: "17:14:22"
        }
      ],
      overtime_chart: [],
      salary_chart: []
    }
  });
};
