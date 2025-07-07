import React, { type FC } from "react";
import styles from "./infoblock.module.css";

type InfoblockProps = {
  description: string;
  count: number;
  percent: number;
};

const Infoblock: FC<InfoblockProps> = ({ description, count, percent }) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.description}>{description}</p>
      <div className={styles.numbers}>
        <p className={styles.count}>{count}</p>
        <p className={styles.percent}>+{percent}%</p>
      </div>
      <p className={styles.data}>на 01.06.2025</p>
    </div>
  );
};

export default Infoblock;
