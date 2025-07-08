import React, { type FC } from "react";
import styles from "./infoblock.module.css";
import type { InfoblockProps } from "@/types/componentsTypes";

const Infoblock: FC<InfoblockProps> = ({ description, count, percent }) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.description}>{description}</p>
      <div className={styles.numbers}>
        <p className={styles.count}>{count}</p>
        <p className={percent >= 0 ? styles.percent : styles.percentViolet}>{percent}%</p>
      </div>
      <p className={styles.data}>на 01.06.2025</p>
    </div>
  );
};

export default Infoblock;
