import { ElementType, FC } from "react";
import styles from "./box.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

export type BoxProps = {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  component?: ElementType;
  sx?: React.CSSProperties;
} & React.HTMLAttributes<HTMLDivElement>;

export const Box: FC<BoxProps> = ({
  children,
  style,
  className,
  component,
  sx,
  ...rest
}) => {
  const Component = component || "div";

  return (
    <Component
      {...rest}
      className={cn("box", className)}
      style={{ ...style, ...sx }}
    >
      {children}
    </Component>
  );
};
