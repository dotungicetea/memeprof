import classNames from "classnames/bind";
import { ElementType, FC } from "react";
import styles from "./divider.module.scss";

const cn = classNames.bind(styles);

export type DividerProps = {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  component?: ElementType;
  noLine?: boolean;
};

export const Divider: FC<DividerProps> = ({
  style,
  noLine,
  children,
  className,
  component,
}) => {
  const Component = component || "div";

  return (
    <Component
      className={cn("divider", className, {
        "divider--no-line": noLine,
      })}
      style={style}
    >
      {children}
    </Component>
  );
};
