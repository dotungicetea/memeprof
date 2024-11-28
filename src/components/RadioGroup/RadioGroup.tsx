"use client";

import * as RG from "@radix-ui/react-radio-group";
import classNames from "classnames/bind";
import React, { useRef } from "react";
import { Box } from "../Box";
import TouchRipple, { TouchRippleActions } from "../TouchRipple/TouchRipple";
import useTouchRipple from "../TouchRipple/useTouchRipple";
import styles from "./radio-group.module.scss";

const cn = classNames.bind(styles);

interface RadioGroupProps<T> {
  options: {
    label: string;
    value: T;
    id: string;
    subLabel?: React.ReactNode;
  }[];
  value?: T;
  onChange: (value: T) => void;
  className?: string;
  style?: React.CSSProperties;
  renderOption?: (option: { label: string; value: T }) => React.ReactNode;
  defaultValue?: T;
}

const Option = <T extends string>({
  onChange,
  renderOption,
  option,
}: {
  onChange: RadioGroupProps<T>["onChange"];
  renderOption: RadioGroupProps<T>["renderOption"];
  option: RadioGroupProps<T>["options"][0];
}) => {
  const rippleRef = useRef<TouchRippleActions>(null);
  const itemRef = useRef<HTMLButtonElement>(null);

  const { enableTouchRipple, getRippleHandlers } = useTouchRipple({
    disabled: false,
    rippleRef,
    disableFocusRipple: false,
    disableRipple: false,
    disableTouchRipple: false,
  });
  return (
    <Box
      className={cn("radio-group__option")}
      onClick={(e) => {
        itemRef.current?.click();
      }}
      {...getRippleHandlers()}
    >
      <RG.Item
        className={cn("radio-group__item")}
        value={option.value}
        id={option.id}
        ref={itemRef}
      >
        <RG.Indicator className={cn("radio-group__indicator")} />
      </RG.Item>

      {renderOption ? (
        renderOption(option)
      ) : (
        <label className={cn("radio-group__label")} htmlFor={option.id}>
          {option.label}

          {option.subLabel && (
            <span className={cn("radio-group__language")}>
              {option.subLabel}
            </span>
          )}
        </label>
      )}
      {enableTouchRipple ? (
        <TouchRipple center={false} ref={rippleRef} />
      ) : null}
    </Box>
  );
};

const RadioGroup = <T extends string>({
  options,
  value,
  onChange,
  className,
  style,
  renderOption,
  defaultValue,
}: RadioGroupProps<T>) => {
  return (
    <RG.Root
      style={style}
      value={value}
      onValueChange={onChange}
      defaultValue={defaultValue}
      className={cn("radio-group", className)}
    >
      {options.map((option) => (
        <Option
          key={option.id}
          onChange={onChange}
          option={option}
          renderOption={renderOption}
        />
      ))}
    </RG.Root>
  );
};

export default RadioGroup;
