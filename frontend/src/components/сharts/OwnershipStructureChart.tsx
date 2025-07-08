import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Title } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import type { OwnershipStructure } from "@/types/chartTypes";
import { fetchData } from "./../../utils/fetchData";
import { ownershipStructureData, pieOptions } from "./chartsSettings";

ChartJS.register(ArcElement, Tooltip, Title, ChartDataLabels);

import styles from "./style.module.css";
import Legend from "../legend/Legend";

const OwnershipStructureChart = () => {
  const [data, setData] = useState<OwnershipStructure | null>(null);

  useEffect(() => {
    fetchData(setData, `http://localhost:5000/api/rabotodateli/ownershipStructure`);
  }, []);

  const chartData = ownershipStructureData(data);

  const options = pieOptions();

  const props = [
    { color: "#4C84CF", name: "Муниципальная" },
    { color: "#6DA2E9", name: "Частная" },
    { color: "#C1D8F7", name: "Государственная" },
  ];

  return (
    <div className={styles.chartWrapper}>
      <p>Собственность: структура</p>

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
          // style={{ width: "120px" }}
        >
          <Pie data={chartData} options={options} />
        </div>

        <Legend item={props} orientation="vertical" />
      </div>
    </div>
  );
};

export default OwnershipStructureChart;
