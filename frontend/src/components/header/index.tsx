import React, { useState, useEffect } from "react";
import styles from "./header.module.css";
import logo from "./../../assets/header-info.svg";

const Header = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const onResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <img src={logo} alt="LOGO" />
        <p>ИНФОРМАЦИОННО-АНАЛИТИЧЕСКИЙ ПОРТАЛ ЛИПЕЦКОЙ ОБЛАСТИ</p>
      </div>
      {/* 
      <div className={styles.links}>
        <a>ПОРТАЛ ЛО</a>
        <a>ИАС ЛО</a>
        <a>ГАСУ</a>
      </div>

      <div className={styles.buttons}>
        <a>Администратор</a>
        <a>Выйти</a>
      </div> */}
      {size.width}px × {size.height}px
    </div>
  );
};

export default Header;
