import { useGoodEvents, useBadEvents } from "@/hooks";
// import { createUpdatedGroupsManager } from "@mui/x-data-grid-pro/utils/tree/utils";
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
// import useSWR from "swr";

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
  const { badEvents } = useBadEvents();
  const [data, setData] = useState<ChartData<"bar">>();
  const [options, setOptions] = useState(getDefaultOptions());

  console.log(goodEvents);

  useEffect(() => {
    const goodData =
      goodEvents &&
      goodEvents.reduce((accum, current) => {
        const expectedTstampKeyMinutes = new Date(
          current.event.derived_tstamp
        ).setSeconds(0, 0);
        console.log(expectedTstampKeyMinutes)
        if (accum[expectedTstampKeyMinutes]) {
          accum[expectedTstampKeyMinutes] = accum[
            expectedTstampKeyMinutes
          ] += 1;
        } else {
          accum[expectedTstampKeyMinutes] = accum[expectedTstampKeyMinutes] = 1;
        }
        return accum;
      }, {});

    if (!goodData) {
      return;
    }
    const goodDataset = Object.keys(goodData).map((element) => ({
      x: Number(element),
      y: goodData[element],
    }));

    const badData =
      badEvents &&
      badEvents.reduce((accum, current) => {
        const expectedTstampKeyMinutes =
          new Date(current.rawEvent.parameters.dtm * 1000 / 1000).setSeconds(0, 0)

        console.log(" bad expectedTstampKeyMinutes")
        console.log(expectedTstampKeyMinutes)

        if (accum[expectedTstampKeyMinutes]) {
          accum[expectedTstampKeyMinutes] = accum[
            expectedTstampKeyMinutes
          ] += 1;
        } else {
          accum[expectedTstampKeyMinutes] = accum[expectedTstampKeyMinutes] = 1;
        }
        return accum;
      }, {});


    if (!badData) {
      return;
    }
    console.log(badData)
    const badDataset = Object.keys(badData).map((element) => ({
      x: Number(element),
      y: badData[element],
    }));

    setOptions(getDefaultOptions());

    setData({
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

  if (!data) {
    return null;
  }

  return <Bar options={options} data={data} />;
}
