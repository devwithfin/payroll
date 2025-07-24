// src/components/hr/chart/PieChart.jsx
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ data }) {
  const labels = Object.keys(data);
  const values = Object.values(data);

  const total = values.reduce((a, b) => a + b, 0);

  const backgroundColors = ['#3f51b5', '#ff9800', '#4caf50'];

  const chartData = {
    labels: labels.map((label, index) => {
      const percent = total ? ((values[index] / total) * 100).toFixed(1) : 0;
      return `${label} (${percent}%)`;
    }),
    datasets: [
      {
        data: values,
        backgroundColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 15,
          padding: 20,
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-4 shadow-sm border h-100">
      <h6 className="mb-3 fw-semibold">Employee Type</h6>
      <div style={{ width: "100%", height: "250px" }}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
}
