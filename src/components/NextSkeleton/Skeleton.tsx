"use client";

import classNames from "classnames/bind";
import React from "react";
import styles from "./Skeleton.module.scss";

const cn = classNames.bind(styles);

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  sx?: React.CSSProperties;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "100%",
  borderRadius = "12px",
  className,
}) => {
  return (
    <div
      className={cn("skeleton", className, "dark")}
      style={{ width, height, borderRadius }}
    ></div>
  );
};

export default Skeleton;
