import classNames from "classnames/bind";
import { CSSProperties, ElementType, FC, ReactNode } from "react";
import styles from "./typography.module.scss";

const cn = classNames.bind(styles);

export type TypographyProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  component?: ElementType;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption"
    | "button"
    | "overline";
  align?: "inherit" | "left" | "center" | "right" | "justify";
  color?:
    | "initial"
    | "inherit"
    | "primary"
    | "secondary"
    | "textPrimary"
    | "textSecondary"
    | "error";
  gutterBottom?: boolean;
  noWrap?: boolean;
  paragraph?: boolean;
  fontSize?: "lg" | "md" | "sm" | "xs";
  textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";
  dangerousHTML?: string;
  onClick?: (event: React.SyntheticEvent) => void;
  bold?: boolean;
  useSecondaryFont?: boolean;
};

export const Typography: FC<TypographyProps> = ({
  children,
  style,
  fontSize,
  className,
  component,
  variant = "body1",
  align = "inherit",
  color = "initial",
  gutterBottom = false,
  noWrap = false,
  paragraph = false,
  textTransform = "none",
  useSecondaryFont = false,
  dangerousHTML,
  onClick,
  bold,
}) => {
  const Component = component || "div";

  return (
    <Component
      className={cn(
        "typography",
        className,
        `typography--${variant}`,
        `typography--${align}`,
        `typography--${color}`,
        `typography--${fontSize}`,
        {
          "typography--gutterBottom": gutterBottom,
          "typography--noWrap": noWrap,
          "typography--paragraph": paragraph,
          "typography--bold": bold,
          "font-black": useSecondaryFont,
        }
      )}
      style={{
        ...style,
        textTransform,
      }}
      dangerouslySetInnerHTML={
        dangerousHTML ? { __html: dangerousHTML } : undefined
      }
      onClick={onClick}
    >
      {children}
    </Component>
  );
};
