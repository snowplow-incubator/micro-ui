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
import { aggregateMicroDatasets } from "./utils";
import { Box } from "@mui/material";
import { draw } from "patternomaly";

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
  const [options, setOptions] = useState(getDefaultBarChartOptions(false));

  useEffect(() => {
    if (!goodEvents || !badEvents) {
      return;
    }

    const { goodDataset, badDataset } =
      aggregateMicroDatasets(
        goodEvents,
        badEvents,
        (event) => event.event.derived_tstamp,
        (event) => (event?.rawEvent?.parameters.dtm * 1000) / 1000
      )

    const hasEvents = Boolean(goodDataset.length || badDataset.length);
    setOptions(getDefaultBarChartOptions(hasEvents));

    setBaChartData({
      datasets: [
        {
          label: "Good",
          // @ts-expect-error
          data: goodDataset,
          backgroundColor: draw("dot", "#0B7F86"),
          barPercentage: 0.8,
          categoryPercentage: 0.7,
        },
        {
          label: "Bad",
          barPercentage: 0.8,
          categoryPercentage: 0.7,
          // @ts-expect-error
          data: badDataset,
          backgroundColor: "#DD3327",
        },
      ],
    });
  }, [goodEvents, badEvents]);

  if (!barChartData) {
    return null;
  }

  return (
    <Box sx={{ height: "300px" }}>
      <Bar options={options} data={barChartData} />
    </Box>
  );
}
