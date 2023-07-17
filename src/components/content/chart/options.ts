import { ChartOptions } from "chart.js";
import { DateTime } from "luxon";

export const getDefaultBarChartOptions: () => ChartOptions<"bar"> = () => ({
  plugins: {
    title: {
      display: true,
      text: "Micro Events Stream",
    },
  },
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  scales: {
    x: {
      type: "time",
      time: { unit: "minute", round: "minute" },
      max: new Date().valueOf(),
      min: DateTime.now().minus({ minutes: 15 }).valueOf(),
    },
    y: {
      stacked: true,
    },
  },
});
