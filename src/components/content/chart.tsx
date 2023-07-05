import { useGoodEvents } from "@/hooks";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  TimeScale,
  _adapters,
} from "chart.js";
import "chartjs-adapter-luxon";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import useSWR from "swr";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  TimeScale,
  Title,
  Tooltip,
  Legend
);

export const getDefaultOptions: () => ChartOptions<"bar"> = () => ({
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

export function EventChart() {
  const { goodEvents } = useGoodEvents();
  const [data, setData] = useState<ChartData<"bar">>();
  const [options, setOptions] = useState(getDefaultOptions());

  console.log(goodEvents);

  useEffect(() => {
    const dataset =
      goodEvents &&
      goodEvents.reduce((accum, current) => {
        const expectedTstampKeyMinutes = new Date(
          current.event.derived_tstamp
        ).setSeconds(0, 0);
        if (accum[expectedTstampKeyMinutes]) {
          accum[expectedTstampKeyMinutes] = accum[
            expectedTstampKeyMinutes
          ] += 1;
        } else {
          accum[expectedTstampKeyMinutes] = accum[expectedTstampKeyMinutes] = 1;
        }
        return accum;
      }, {});

    if (!dataset) {
      return;
    }
    const trueDataset = Object.keys(dataset).map((element) => ({
      x: Number(element),
      y: dataset[element],
    }));

    setOptions(getDefaultOptions());

    setData({
      datasets: [
        {
          label: "Good Events",
          data: trueDataset,
          backgroundColor: "rgb(255, 99, 132)",
          stack: "Stack 0",
        },
      ],
    });
  }, [goodEvents.length]);

  if (!data) {
    return null;
  }

  return <Bar options={options} data={data} />;
}
