"use client";

import classnames from "classnames/bind";
import React from "react";
import { Typography } from "../Typography";
import styles from "./Empty.module.scss";
import Image from "next/image";

type EmptyProps = {
  style?: React.CSSProperties;
};

const cn = classnames.bind(styles);

const Empty = ({ style }: EmptyProps) => {
  return (
    <div className={cn("empty")} style={style}>
      <Image
        src="/images/no-results.png"
        alt="No Result Found"
        width={70}
        height={70}
      />

      <Typography variant="h2" align="center">
        No Result Found
      </Typography>
    </div>
  );
};

export default Empty;
