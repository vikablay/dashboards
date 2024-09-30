import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Chart, {
  ChartConfiguration,
  ChartType,
  ChartTypeRegistry,
  DefaultDataPoint,
} from "chart.js/auto";

import { getUsersAndMinutes } from "../lib/get-user-and-minutes";
import { chartData } from "./data";

export const ChartBar = () => {
  const canvasNode = useRef<HTMLCanvasElement | null>(null);
  const [time, setTime] = useState<"m" | "h">("m");

  const setTicks = useCallback(() => {
    setTime((prevState) => (prevState === "m" ? "h" : "m"));
  }, []);

  const chartConfig = useMemo(
    (): ChartConfiguration<
      ChartType,
      DefaultDataPoint<ChartType>,
      unknown
    > => ({
      type: "bar" as keyof ChartTypeRegistry,
      options: {
        plugins: {
          tooltip: {
            enabled: true,
          },
        },
        scales: {
          y: {
            max: time === "m" ? 9300 : 200,
            ticks: {
              callback: (value: string | number) =>
                `${value} ${time === "m" ? "мин" : "ч"}`,
            },
          },
        },
      },

      data: {
        labels: getUsersAndMinutes(chartData).map((item) => item.user.name),
        datasets: [
          {
            label: `Количество списанных ${
              time === "m" ? "минут" : "часов"
            } за сентябрь (кликни на диаграммку)`,
            data: getUsersAndMinutes(chartData).map((item) =>
              time === "m" ? item.minutes : Math.floor(item.minutes / 60)
            ),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
    }),
    [time]
  );

  useEffect(() => {
    if (canvasNode && canvasNode.current) {
      const newChartInstance = new Chart(canvasNode.current, chartConfig);
      return () => {
        newChartInstance.destroy();
      };
    }
  }, [canvasNode, time]);

  return (
    <div style={{ width: "1100px", height: "700px" }} onClick={setTicks}>
      <canvas ref={canvasNode} />
    </div>
  );
};
