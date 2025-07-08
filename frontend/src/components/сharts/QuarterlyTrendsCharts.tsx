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
import type { QuarterlyTrends } from "@/types/chartTypes";
import { fetchData } from "./../../utils/fetchData";
import { lineOptions, quarterlyTrendsData } from "./chartsSettings";

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

const QuarterlyTrendsCharts = () => {
  const [data, setData] = useState<QuarterlyTrends | null>(null);

  useEffect(() => {
    fetchData(setData, `http://localhost:5000/api/dashboard/quarterlyTrends`);
  }, []);

  const chartData = quarterlyTrendsData(data);

  if (!chartData) {
    return <div>Нет данных для отображения</div>;
  }

  const options = lineOptions(false, 10, 2);

  const props = [
    { color: "#8E44AD", name: "Коллективные договоры" },
    { color: "#4C84CF", name: "Отраслевые соглашения" },
  ];

  return (
    // <div style={{ width: "100%", height: "240px" }}>
    //   <Line
    //     data={chartData}
    //     options={options}
    //     plugins={[ChartDataLabels]}
    //     style={{ width: "100%", height: "100%", display: "block" }}
    //   />
    // </div>

    <div className={styles.chartWrapper} style={{ width: "45%" }}>
      <p>Охват работников по отраслям деятельности</p>

      <div
        className={styles.chart}
        //  style={{ flex: 1, height: "100%" }}
      >
        <Line
          data={chartData}
          options={options}
          plugins={[ChartDataLabels]}
          // style={{ width: "100%", height: "50%", display: "block" }}
        />
      </div>

      <Legend item={props} orientation="horizontal" />
    </div>
  );
};

export default QuarterlyTrendsCharts;
