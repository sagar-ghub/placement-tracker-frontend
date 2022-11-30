import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip);

export default function DoughNut({ data }) {
  return (
    <div className="doughnut">
      <br />
      <Doughnut
        data={data}
        height="200px"
        width="200px"
        // options={{ maintainAspectRatio: false }}
      />
    </div>
  );
}
