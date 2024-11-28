"use client";

import icons from "@/assets/icons";
import classNames from "classnames/bind";
import React, { FC, forwardRef, useRef } from "react";
import TouchRipple, { TouchRippleActions } from "../TouchRipple/TouchRipple";
import useTouchRipple from "../TouchRipple/useTouchRipple";
import styles from "./IconButton.module.scss";

const cn = classNames.bind(styles);

type IconButtonProps = {
  icon: keyof typeof icons;
  onClick: (event: React.SyntheticEvent) => void;
  className?: string;
  style?: React.CSSProperties;
  color?: "primary" | "secondary" | "default" | "error" | "success" | "warning";
  disableRipple?: boolean;
  iconClassName?: string;
};

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      onClick,
      className,
      style,
      color = "primary",
      disableRipple = false,
      iconClassName,
    },
    ref
  ) => {
    const rippleRef = useRef<TouchRippleActions>(null);

    const { enableTouchRipple, getRippleHandlers } = useTouchRipple({
      disabled: false,
      rippleRef,
      disableFocusRipple: disableRipple,
      disableRipple,
      disableTouchRipple: disableRipple,
    });

    const Component = icons[icon];

    return (
      <button
        ref={ref}
        className={cn("icon-button", className, `icon-button--${color}`)}
        onClick={onClick}
        style={style}
        {...getRippleHandlers()}
      >
        <Component className={cn("icon-button__icon", iconClassName)} />
        {enableTouchRipple ? (
          <TouchRipple center={false} ref={rippleRef} />
        ) : null}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
