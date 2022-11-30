import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip
  // Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Company Chart",
    },
  },
};

// const labels = ["January", "February", "March", "April", "May", "June", "July"];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: "Dataset 1",
//       data: [65, 59, 80, 81, 56, 55, 40],
//       backgroundColor: "",
//     },
//     {
//       label: "Dataset 2",
//       data: [28, 48, 40, 19, 86, 27, 90],
//       backgroundColor: "rgba(53, 162, 235, 0.5)",
//     },
//   ],
// };

export function BarChart({ data }) {
  return <Bar options={options} data={data} />;
}
