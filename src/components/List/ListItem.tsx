"use client";

import icons from "@/assets/icons";
import TouchRipple, {
  TouchRippleActions,
} from "@/components/TouchRipple/TouchRipple";
import useTouchRipple from "@/components/TouchRipple/useTouchRipple";
import classNames from "classnames/bind";
import Link from "next/link";
import React, { FC, useRef } from "react";
import styles from "./list-item.module.scss";

const cn = classNames.bind(styles);

type Props = {
  children?: React.ReactNode;
  leftIcon?: keyof typeof icons;
  rightIcon?: keyof typeof icons;
  onClick?: (event: React.SyntheticEvent) => void;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  active?: boolean;

  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "danger" | "success" | "warning";
  variant?: "contained" | "outlined" | "text";
  loading?: boolean;
  href?: string;
  divider?: boolean;
  noPadding?: boolean;
  disableRipple?: boolean;
};

const ListItem: FC<Props> = ({
  children,
  className,
  style,
  onClick,
  disabled,
  active,
  leftIcon,
  rightIcon,
  size = "md",
  color = "primary",
  variant = "contained",
  loading,
  href,
  divider,
  noPadding,
  disableRipple,
}) => {
  const rippleRef = useRef<TouchRippleActions>(null);

  const { enableTouchRipple, getRippleHandlers } = useTouchRipple({
    disabled: !!disabled,
    rippleRef,
    disableFocusRipple: disableRipple,
    disableRipple,
    disableTouchRipple: disableRipple,
  });

  const Component = href ? Link : "div";

  const onListItemClick = (event: React.SyntheticEvent) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Component
      className={cn(
        "list-item",
        className,
        `list-item--${size}`,
        `list-item--${color}`,
        `list-item--${variant}`,
        {
          "list-item--disabled": disabled,
          "list-item--active": active,
          "list-item--no-padding": noPadding,
        }
      )}
      style={style}
      onClick={onListItemClick}
      href={href!}
      {...getRippleHandlers()}
    >
      {leftIcon && (
        <div className={cn("list-item__left-icon")}>
          {React.createElement(icons[leftIcon], {
            className: cn("list-item__icon"),
          })}
        </div>
      )}
      <div className={cn("list-item__content")}>{children}</div>
      {rightIcon && (
        <div className={cn("list-item__right-icon")}>
          {React.createElement(icons[rightIcon], {
            className: cn("list-item__icon"),
          })}
        </div>
      )}
      {divider && <div className={cn("list-item__divider")} />}
      {enableTouchRipple ? (
        <TouchRipple center={false} ref={rippleRef} />
      ) : null}
    </Component>
  );
};

export default ListItem;
