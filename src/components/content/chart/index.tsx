import { useGoodEvents, useBadEvents } from "@/hooks";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  TimeScale,
  _adapters,
} from "chart.js";
import "chartjs-adapter-luxon";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { getDefaultBarChartOptions } from "./options";
import { aggregateMicroDataset } from "./utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  TimeScale,
  Title,
  Tooltip,
  Legend
);

export function EventChart() {
  const { goodEvents } = useGoodEvents();
  const { badEvents } = useBadEvents();
  const [barChartData, setBaChartData] = useState<ChartData<"bar">>();
  const [options, setOptions] = useState(getDefaultBarChartOptions());

  useEffect(() => {
    if (!goodEvents || !badEvents) {
      return;
    }

    const goodDataset = aggregateMicroDataset(
      goodEvents,
      (event) => event.event.derived_tstamp
    );
    const badDataset = aggregateMicroDataset(
      badEvents,
      (event) => (event.rawEvent.parameters.dtm * 1000) / 1000
    );

    setOptions(getDefaultBarChartOptions());

    setBaChartData({
      datasets: [
        {
          label: "Good Events",
          data: goodDataset,
          backgroundColor: "rgb(255, 99, 132)",
          stack: "Stack 0",
        },
        {
          label: "Bad Events",
          data: badDataset,
          backgroundColor: "rgb(0, 99, 132)",
          stack: "Stack 0",
        },
      ],
    });
  }, [goodEvents, badEvents]);

  if (!barChartData) {
    return null;
  }

  return <Bar options={options} data={barChartData} />;
}
