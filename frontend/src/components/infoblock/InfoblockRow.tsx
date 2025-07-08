import styles from "./infoblock.module.css";
import Infoblock from ".";
import React, { useEffect, useState } from "react";
import { fetchData } from "./../../utils/fetchData";

const InfoblockRow = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(setData, `http://localhost:5000/api/dashboard/infoblock`);
  }, []);

  if (!data) return null;
  console.log(data);

  const dataArray = Object.values(data);

  return (
    <div className={styles.infoblockRow}>
      {dataArray.map((item, index) => (
        <Infoblock
          key={index}
          description={item.Заголовок || "Без названия"}
          count={item.Значение || 0}
          percent={item.Процент || 0}
        />
      ))}
    </div>

    // http://localhost:5000/api/dashboard/infoblock
  );
};

export default InfoblockRow;
