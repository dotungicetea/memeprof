"use client";

import * as RadixCheckbox from "@radix-ui/react-checkbox";
import classNames from "classnames/bind";
import React, { useId } from "react";
import Icon from "../Icon/Icon";
import RippleBase from "../RippleBase/RippleBase";
import styles from "./Checkbox.module.scss";

const cn = classNames.bind(styles);

export interface CheckboxProps {
  label?: string;
  className?: string;
  style?: React.CSSProperties;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  checked?: boolean;
}

const Checkbox = ({
  label,
  className,
  style,
  defaultChecked,
  onChange,
  checked,
}: CheckboxProps) => {
  const fieldId = useId();

  return (
    <RippleBase className={cn("checkbox")} component={"label"}>
      <RadixCheckbox.Root
        className={cn("checkbox__root")}
        defaultChecked={defaultChecked}
        onCheckedChange={onChange}
        checked={checked}
        id={fieldId}
      >
        <RadixCheckbox.Indicator className={cn("checkbox__indicator")}>
          <Icon icon="check" color="primary" />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      <span className={cn("checkbox__label")}>{label}</span>
    </RippleBase>
  );
};

export default Checkbox;
