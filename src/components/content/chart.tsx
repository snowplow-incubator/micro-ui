import { useGoodEvents } from "@/hooks";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
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
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: "Good Events",
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       backgroundColor: "rgb(255, 99, 132)",
//       stack: "Stack 0",
//     },
//     // {
//     //   label: "Bad Events",
//     //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//     //   backgroundColor: "rgb(75, 192, 192)",
//     //   stack: "Stack 0",
//     // },
//   ],
// };

export function EventChart() {
  const { goodEvents } = useGoodEvents();
  const [data, setData] = useState(null);

  useEffect(() => {
    setData({
      labels,
      datasets: [
        {
          label: "Good Events",
          data: [{}, {}, {}, {}, {}],
          backgroundColor: "rgb(255, 99, 132)",
          stack: "Stack 0",
        },
        // {
        //   label: "Bad Events",
        //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        //   backgroundColor: "rgb(75, 192, 192)",
        //   stack: "Stack 0",
        // },
      ],
    });
  }, []);

  if (!data) {
    return null;
  }

  console.log(goodEvents);
  return <Bar options={options} data={data} />;
}
