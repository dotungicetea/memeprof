import React from "react";
import styles from "./KeyVal.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

type Props = {
  label: string;
  value: string | number;
  currency?: string;
};

export const KeyVal = ({ label, value, currency }: Props) => {
  return (
    <div className={cn("keyval")}>
      <div className={cn("keyval__label")}>{label}</div>
      <div className={cn("keyval__value")}>
        {value}
        {currency && <span className={cn("keyval__currency")}>{currency}</span>}
      </div>
    </div>
  );
};
