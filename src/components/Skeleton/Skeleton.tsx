import classNames from "classnames/bind";
import styles from "./Skeleton.module.scss";

const cn = classNames.bind(styles);
import React from "react";
import { getTelegram } from "@/utils";

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "100%",
  borderRadius = "12px",
  className = "",
}) => {
  const Telegram = getTelegram();

  return (
    <div
      className={cn("skeleton", className, "dark")}
      style={{ width, height, borderRadius }}
    ></div>
  );
};

export default Skeleton;
