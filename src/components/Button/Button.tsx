"use client";

import classNames from "classnames/bind";
import { CSSProperties, FC, MouseEventHandler, ReactNode, useRef } from "react";
import TouchRipple, { TouchRippleActions } from "../TouchRipple/TouchRipple";
import useTouchRipple from "../TouchRipple/useTouchRipple";
import styles from "./Button.module.scss";

const cn = classNames.bind(styles);

export type ButtonProps = {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  style?: CSSProperties;
  className?: string;
  disableRipple?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "contained" | "outlined" | "text";
  leftIcon?: ReactNode;
};

const Button: FC<ButtonProps> = ({
  children,
  className,
  disableRipple,
  variant = "contained",
  leftIcon = null,
  ...rest
}) => {
  const rippleRef = useRef<TouchRippleActions>(null);

  const { enableTouchRipple, getRippleHandlers } = useTouchRipple({
    disabled: false,
    rippleRef,
    disableFocusRipple: disableRipple,
    disableRipple,
    disableTouchRipple: disableRipple,
  });

  const hasIcon = !!leftIcon;

  return (
    <button
      {...rest}
      className={cn("btn", className, {
        "btn--contained": variant === "contained",
        "btn--outlined": variant === "outlined",
        "btn--text": variant === "text",
        "btn--icon": hasIcon,
      })}
      type="button"
      {...getRippleHandlers()}
    >
      {leftIcon}
      {children}
      {enableTouchRipple ? (
        <TouchRipple center={false} ref={rippleRef} />
      ) : null}
    </button>
  );
};

export default Button;
