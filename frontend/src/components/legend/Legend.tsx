import React, { type FC } from "react";
import styles from "./legend.module.css";
import type { LegendProps } from "@/types/componentsTypes";

const Legend: FC<LegendProps> = ({ item, orientation }) => {
  return (
    <div
      className={
        orientation === "horizontal" ? styles.legendHorizontal : styles.legendVertical
      }
    >
      {item.map((div) => (
        <div className={styles.legendItem}>
          <div className={styles.color} style={{ backgroundColor: div.color }}></div>
          <div className={styles.name}>{div.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Legend;
