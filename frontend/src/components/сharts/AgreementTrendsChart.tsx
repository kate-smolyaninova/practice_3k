import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Line } from "react-chartjs-2";
import type { AgreementTrends } from "@/types/chartTypes";
import { fetchData } from "./../../utils/fetchData";
import { agreementTrendsData, lineOptions } from "./chartsSettings";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  ChartDataLabels,
);

import styles from "./style.module.css";
import Legend from "../legend/Legend";

const AgreementTrendsChart = () => {
  const [data, setData] = useState<AgreementTrends | null>(null);

  useEffect(() => {
    fetchData(setData, `http://localhost:5000/api/dashboard/agreementTrends`);
  }, []);

  const chartData = agreementTrendsData(data);

  if (!chartData) {
    return <div>Нет данных для отображения</div>;
  }

  const options = lineOptions(true, 20, 5);

  const props = [
    { color: "#9B8EDE", name: "Коллективные договоры" },
    { color: "#4C84CF", name: "Отраслевые соглашения" },
  ];

  return (
    <div className={styles.wrapper} style={{ width: "100%", height: "100%" }}>
      <p>Динамика договоров по кварталам</p>

      <div className={styles.chart} style={{ width: "100%", height: "85%" }}>
        <Line data={chartData} options={options} plugins={[ChartDataLabels]} />
      </div>

      <Legend item={props} orientation="horizontal" />
    </div>
  );
};

export default AgreementTrendsChart;
