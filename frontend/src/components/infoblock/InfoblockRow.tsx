import React from "react";
import styles from "./infoblock.module.css";
import Infoblock from ".";

const InfoblockRow = () => {
  return (
    <div className={styles.infoblockRow}>
      <Infoblock description="Численность работников, чел" count={15000} percent={15} />
      <Infoblock description="Численность работников, чел" count={15000} percent={15} />
      <Infoblock description="Численность работников, чел" count={15000} percent={15} />
      <Infoblock description="Численность работников, чел" count={15000} percent={15} />
      <Infoblock description="Численность работников, чел" count={15000} percent={15} />
      <Infoblock description="Численность работников, чел" count={15000} percent={15} />
    </div>

    // "Численность работников"
    // "Обновлено договоров"
    // "Обновлено соглашений"
  );
};

export default InfoblockRow;
