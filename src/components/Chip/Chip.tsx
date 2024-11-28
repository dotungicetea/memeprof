"use client";

import classNames from "classnames/bind";
import {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  ReactNode,
  SyntheticEvent,
  useRef,
} from "react";
import TouchRipple, { TouchRippleActions } from "../TouchRipple/TouchRipple";
import useTouchRipple from "../TouchRipple/useTouchRipple";
import styles from "./Chip.module.scss";

const cn = classNames.bind(styles);

type Props = {
  children?: ReactNode;
  className?: string;
  onClick?: (event: SyntheticEvent) => void;
  isActive?: boolean;
  disableRipple?: boolean;
  disabled?: boolean;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Chip: FC<Props> = ({
  className,
  onClick,
  children = null,
  isActive,
  disableRipple,
  disabled = false,
  ...rest
}) => {
  const rippleRef = useRef<TouchRippleActions>(null);

  const { enableTouchRipple, getRippleHandlers } = useTouchRipple({
    disabled,
    rippleRef,
    disableFocusRipple: disableRipple,
    disableRipple,
    disableTouchRipple: disableRipple,
  });

  return (
    <div
      {...rest}
      className={cn("chip", className, {
        "chip--active": isActive,
        "chip--disabled": disabled,
      })}
      {...getRippleHandlers()}
      onClick={onClick}
    >
      {children}
      {enableTouchRipple ? (
        <TouchRipple center={false} ref={rippleRef} />
      ) : null}
    </div>
  );
};

export default Chip;
