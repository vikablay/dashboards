import Chart, {
  ChartConfiguration,
  ChartType,
  ChartTypeRegistry,
  DefaultDataPoint,
} from "chart.js/auto";
import { useEffect, useMemo, useRef } from "react";
import { getProjectssAndMinutes } from "../lib/get-projects-and-minutes";

export const Pie = () => {
  const canvasNode = useRef<HTMLCanvasElement | null>(null);

  const chartConfig = useMemo(
    (): ChartConfiguration<
      ChartType,
      DefaultDataPoint<ChartType>,
      unknown
    > => ({
      type: "pie" as keyof ChartTypeRegistry,
      options: {
        maintainAspectRatio: false, //чтобы убралось соблюдение сторон??
        plugins: {
          tooltip: {
            enabled: true,
          },
          legend: {
            display: true,
            position: "right",
            align: "center",
          },
        },
      },

      data: {
        labels: getProjectssAndMinutes().map((item) => item.project.name),
        datasets: [
          {
            label: `Количество списанных часов за сентябрь`,
            data: getProjectssAndMinutes().map((item) =>
              Math.floor(item.minutes / 60)
            ),
            backgroundColor: getProjectssAndMinutes().map(
              () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
            ),
            hoverBorderColor: "red",
          },
        ],
      },
    }),
    []
  );

  useEffect(() => {
    if (canvasNode && canvasNode.current) {
      const newChartInstance = new Chart(canvasNode.current, chartConfig);
      return () => {
        newChartInstance.destroy();
      };
    }
  }, [canvasNode]);

  return (
    <div style={{ width: "1100px", height: "500px" }}>
      <canvas ref={canvasNode} />
    </div>
  );
};
