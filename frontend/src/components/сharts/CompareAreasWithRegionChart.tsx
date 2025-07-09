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
import type { CompareAreas } from "@/types/chartTypes";
import { barOptions, compareAreasData } from "./chartsSettings";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, ChartDataLabels);

import styles from "./style.module.css";
import Legend from "../legend/Legend";

const CompareAreasWithRegionChart = () => {
  const [data, setData] = useState<CompareAreas | null>(null);

  useEffect(() => {
    fetchData(setData, `http://localhost:5000/api/dashboard/compareAreasWithRegion`);
  }, []);

  const labels = ["Коллективные договоры", "Отраслевые соглашения", "Финансирование"];

  const chartData = compareAreasData(data, labels);

  if (!chartData) {
    return <div>Нет данных для отображения</div>;
  }

  const options = barOptions(labels, 12);

  const props = [
    { color: "#4C84CF", name: "Липецкая область" },
    { color: "#6DA2E9", name: "МО" },
  ];

  return (
    <div className={styles.chartWrapper} style={{ width: "25%" }}>
      <p>Сравнение районов с областью</p>

      <div className={styles.chart}>
        <Bar data={chartData} options={options} />
      </div>

      <Legend item={props} orientation="horizontal" />
    </div>
  );
};

export default CompareAreasWithRegionChart;
