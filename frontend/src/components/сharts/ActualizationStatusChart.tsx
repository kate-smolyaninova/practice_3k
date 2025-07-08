import React, { useEffect, useState } from "react";
import { fetchData } from "./../../utils/fetchData";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";

import type { ActualizationStatus } from "@/types/chartTypes";
import { actualizationStatusData, barOptions } from "./chartsSettings";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, ChartDataLabels);

import styles from "./style.module.css";
import Legend from "../legend/Legend";

const ActualizationStatusChart = () => {
  const [data, setData] = useState<ActualizationStatus | null>(null);

  useEffect(() => {
    fetchData(setData, `http://localhost:5000/api/dashboard/actualizationStatus`);
  }, []);

  const labels = [
    "Коллективные договоры",
    "Отраслевые соглашения",
    "Финансирование",
    "Реестр работодателей",
  ];

  const chartData = actualizationStatusData(data, labels);

  if (!chartData) {
    return <div>Нет данных для отображения</div>;
  }

  const options = barOptions(labels);

  const props = [
    { color: "#C8C2FE", name: "Не актуализировано" },
    { color: "#9B8EDE", name: "Данные актуализированы" },
  ];

  return (
    <div className={styles.chartWrapper} style={{ width: "25%" }}>
      <p>Статус актуализации данных</p>

      <div
        className={styles.chart}
        // style={{ width: "100%", height: "85%" }}
      >
        <Bar data={chartData} options={options} />
      </div>

      <Legend item={props} orientation="horizontal" />
    </div>
  );
};

export default ActualizationStatusChart;
