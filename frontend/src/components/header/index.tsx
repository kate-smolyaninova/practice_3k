import React from "react";
import styles from "./header.module.css";
import logo from "./../../assets/header-info.svg";

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <img src={logo} alt="LOGO" />
        <p>ИНФОРМАЦИОННО-АНАЛИТИЧЕСКИЙ ПОРТАЛ ЛИПЕЦКОЙ ОБЛАСТИ</p>
      </div>

      <div className={styles.links}>
        <a>ПОРТАЛ ЛО</a>
        <a>ИАС ЛО</a>
        <a>ГАСУ</a>
      </div>

      <div className={styles.buttons}>
        <a>Администратор</a>
        <a>Выйти</a>
      </div>
    </div>
  );
};

export default Header;
