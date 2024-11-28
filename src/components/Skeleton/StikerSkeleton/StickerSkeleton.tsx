import classNames from "classnames/bind";
import styles from "./StickerSkeleton.module.scss";

const cn = classNames.bind(styles);
import React from "react";

interface StickerSkeletonProps {
  width?: number;
  height?: number;
  borderRadius?: string;
  className?: string;
}

const StickerSkeleton: React.FC<StickerSkeletonProps> = ({
  width = 100,
  height = 100,
  borderRadius = "12px",
  className = "",
}) => {
  return (
    <div
      className={cn("stiker-skeleton", className, "dark")}
      style={{ width, height, borderRadius }}
    ></div>
  );
};

export default StickerSkeleton;
