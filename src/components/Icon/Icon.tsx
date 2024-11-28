import icons, { IconType } from "@/assets/icons";
import React, { FC } from "react";
import styles from "./Icon.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

type Props = {
  icon: IconType;
  className?: string;
  size?: "sm" | "md" | "lg" | "xs";
  color?: "primary" | "text" | "cta";
};

const Icon: FC<Props> = ({ icon, className, size = "md", color }) => {
  const Component = icons[icon];

  return (
    <Component
      className={cn("icon", className, `icon--${color}`, `icon--${size}`)}
    />
  );
};

export default Icon;
