import React, { useEffect, useState } from "react";
import { fetchData } from "./../../utils/fetchData";

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
import type { IndustryCoverage } from "@/types/chartTypes";
import { industryCoverageData, lineOptions } from "./chartsSettings";

import styles from "./style.module.css";
import Legend from "../legend/Legend";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  ChartDataLabels,
);

const IndustryCoverageChart = () => {
  const [data, setData] = useState<IndustryCoverage | null>(null);

  useEffect(() => {
    fetchData(setData, `http://localhost:5000/api/kollektivnye/industryCoverage`);
  }, []);

  const chartData = industryCoverageData(data);

  if (!chartData) {
    return <div>Нет данных для отображения</div>;
  }

  const options = lineOptions(true, 500, 100);

  const props = [
    { color: "#7267A8", name: "Иные отрасли" },
    { color: "#576EB2", name: "Образование" },
    { color: "#9B8EDE", name: "Медицина" },
    { color: "#3258C9", name: "Культура и искусство" },
  ];

  return (
    <div className={styles.chartWrapper}>
      <p>Охват работников по отраслям деятельности</p>

      <div className={styles.chart}>
        <Line
          data={chartData}
          options={options}
          plugins={[ChartDataLabels]}
          style={{ flex: 1 }}
        />
      </div>

      <Legend item={props} orientation="horizontal" />
    </div>
  );
};

export default IndustryCoverageChart;
