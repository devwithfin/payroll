// src/components/hr/chart/BarChart.jsx
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function BarChart({ data }) {
  const labels = Object.keys(data);
  const values = Object.values(data);
  const backgroundColors = ['#4caf50', '#f44336', '#ffc107', '#9e9e9e'];

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Attendance Count',
        data: values,
        backgroundColor: backgroundColors,
        borderRadius: 5,
        barThickness: 30,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-4 shadow-sm border h-100">
      <h6 className="mb-3 fw-semibold">Attendance Summary</h6>
      <Bar data={chartData} options={options} />
    </div>
  );
}
