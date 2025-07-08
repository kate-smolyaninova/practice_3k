import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Title } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { organizationTypesData, pieOptions } from "./chartsSettings";
import type { OrganizationTypes } from "@/types/chartTypes";
import { fetchData } from "./../../utils/fetchData";

ChartJS.register(ArcElement, Tooltip, Title, ChartDataLabels);

import styles from "./style.module.css";
import Legend from "../legend/Legend";
const OrganizationTypesChart = () => {
  const [data, setData] = useState<OrganizationTypes | null>(null);

  useEffect(() => {
    fetchData(setData, `http://localhost:5000/api/rabotodateli/organizationTypes`);
  }, []);

  const chartData = organizationTypesData(data);

  const options = pieOptions();

  const props = [
    { color: "#C8C2FE", name: "Крупная" },
    { color: "#7956A8", name: "Частная" },
    { color: "#C1D8F7", name: "Малая" },
  ];

  return (
    <div className={styles.chartWrapper}>
      <p>Типология организаций</p>

      <div
        className={styles.chart}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div
          className={styles.pieWrapper}
          // style={{ height: "120px" }}
        >
          <Pie data={chartData} options={options} />
        </div>

        <Legend item={props} orientation="vertical" />
      </div>
    </div>
  );
};
export default OrganizationTypesChart;
