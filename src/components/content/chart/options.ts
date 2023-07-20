import { ChartOptions } from "chart.js";
import { DateTime } from "luxon";

export const getDefaultBarChartOptions: () => ChartOptions<"bar"> = () => ({
  plugins: {
    title: {
      display: false,
    },
    legend: {
      position: "bottom",
      labels: {
        color: "#000",
        font: {
          size: 14,
        },
        pointStyle: "rectRounded",
        usePointStyle: true,
        boxHeight: 20,
        boxWidth: 20,
        padding: 16,
      },
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  scales: {
    x: {
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
      ticks: {
        color: "#000",
      },
      type: "time",
      time: { unit: "minute", round: "minute" },
      max: new Date().valueOf(),
      min: DateTime.now().minus({ minutes: 15 }).valueOf(),
    },
    y: {
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
      ticks: {
        color: "#000",
        precision: 0,
        callback: function (value, index) {
          if (value !== 0) return value;
        },
      },
    },
  },
});
