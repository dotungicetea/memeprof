"use client";

import { Box } from "@/components/Box";
import classNames from "classnames/bind";
import { FC } from "react";
import styles from "./text-field.module.scss";
import icons, { IconType } from "@/assets/icons";
import Button from "@/components/Button";
import TripleDotLoader from "@/components/TripleDotLoader";
import Icon from "@/components/Icon";

const cn = classNames.bind(styles);

type Props = {
  value: string;
  className?: string;
  placeholder: string;
  onChange: (value: string) => void;
  leftIcon?: IconType | React.ReactNode;
  rightActions?: React.ReactNode;
  loading?: boolean;
};

const TextField: FC<Props> = ({
  placeholder,
  value,
  onChange,
  className,
  leftIcon,
  rightActions,
  loading,
}) => {
  const StartIcon =
    typeof leftIcon === "string" ? icons[leftIcon as IconType] : leftIcon;

  return (
    <Box className={cn("text-field__wrapper")}>
      {StartIcon && !loading ? (
        <Box className={cn("text-field__icon")}>
          {typeof StartIcon === "function" ? (
            <StartIcon className={cn("text-field__start-icon")} />
          ) : (
            StartIcon
          )}
        </Box>
      ) : null}
      {loading ? (
        <Box className={cn("text-field__icon")}>
          <Icon icon="loading" className={cn("text-field__icon--loading")} />
        </Box>
      ) : null}
      <input
        value={value}
        placeholder={placeholder}
        className={cn("text-field", className)}
        onChange={(e) => onChange(e.target.value)}
      />
      <Box className={cn("text-field__actions")}>{rightActions}</Box>
    </Box>
  );
};

export default TextField;
