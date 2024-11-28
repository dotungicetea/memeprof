"use client";

import classNames from "classnames/bind";
import * as React from "react";
import styles from "./touchRipple.module.scss";

const cn = classNames.bind(styles);

export interface RippleProps {
  className?: string;
  rippleX: number;
  rippleY: number;
  rippleSize: number;
  in?: boolean;
  onExited?: () => void;
  timeout: number;
}

function Ripple(props: RippleProps) {
  const {
    className,
    rippleX,
    rippleY,
    rippleSize,
    in: inProp,
    onExited,
    timeout,
  } = props;
  const [leaving, setLeaving] = React.useState(false);

  const rippleStyles = {
    width: rippleSize,
    height: rippleSize,
    top: -(rippleSize / 2) + rippleY,
    left: -(rippleSize / 2) + rippleX,
  };

  if (!inProp && !leaving) {
    setLeaving(true);
  }

  React.useEffect(() => {
    if (!inProp && onExited != null) {
      // react-transition-group#onExited
      const timeoutId = setTimeout(onExited, timeout);
      return () => {
        clearTimeout(timeoutId);
      };
    }
    return undefined;
  }, [onExited, inProp, timeout]);

  return (
    <span
      className={cn("ripple", "ripple--visible", className)}
      style={rippleStyles}
    >
      <span
        className={cn("ripple__child", {
          "ripple__child--leaving": leaving,
        })}
      />
    </span>
  );
}

export default Ripple;
