import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function MemberChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "Members",
        data: [5, 8, 12, 18, 25, 30, 36, 42],
        borderWidth: 3,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: 20,
        borderRadius: 12,
        boxShadow: "0 3px 10px rgba(0,0,0,.08)",
      }}
    >
      <h3>Member Growth</h3>

      <Line data={data} options={options} />
    </div>
  );
}