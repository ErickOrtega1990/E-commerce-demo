import React from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./Logo.module.css";

type Props = {};

function Logo({}: Props) {
  useNavigate();
  return (
    <div className={style.container}>
      <Link to={"/"} className={style.link}>
        (Logo)
      </Link>
    </div>
  );
}

export default Logo;
