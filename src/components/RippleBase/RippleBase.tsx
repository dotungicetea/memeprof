"use client";

import React, { FC, useRef } from "react";
import TouchRipple, { TouchRippleActions } from "../TouchRipple/TouchRipple";
import useTouchRipple from "../TouchRipple/useTouchRipple";

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.SyntheticEvent) => void;
  component?: React.ElementType;
  htmlFor?: string;
  disableRipple?: boolean;
  id?: string;
  style?: React.CSSProperties;
};

const RippleBase: FC<Props> = ({
  children,
  className,
  onClick,
  component,
  htmlFor,
  disableRipple,
  id,
  style = null,
}) => {
  const rippleRef = useRef<TouchRippleActions>(null);

  const { enableTouchRipple, getRippleHandlers } = useTouchRipple({
    disabled: false,
    rippleRef,
    disableRipple,
    disableFocusRipple: disableRipple,
    disableTouchRipple: disableRipple,
  });

  const Component = component || "div";

  return (
    <Component
      id={id}
      onClick={onClick}
      className={className}
      {...getRippleHandlers()}
      style={{ position: "relative", ...style }}
      htmlFor={htmlFor}
    >
      {children}
      {enableTouchRipple ? (
        <TouchRipple center={false} ref={rippleRef} />
      ) : null}
    </Component>
  );
};

export default RippleBase;
