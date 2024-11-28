import classNames from "classnames/bind";
import React, { FC } from "react";
import styles from "./textelipsis.module.scss";

const cn = classNames.bind(styles);

type Props = {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  maxLines?: number;
  ellipsis?: string;
  trim?: boolean;
  basedOn?: "letters" | "words";
  component?: string;
  componentProps?: any;
  isDangerous?: boolean;
  color?: Color;
};

const TextElipsis: FC<Props> = ({
  text,
  className,
  style,
  maxLines = 1,
  ellipsis,
  trim,
  basedOn,
  component,
  isDangerous,
  componentProps,
  color = "text",
}) => {
  const Component = component || "div";

  return (
    <Component
      className={cn(
        "text-elipsis",
        className,
        {
          "text-elipsis--trim": trim,
          "text-elipsis--letters": basedOn === "letters",
          "text-elipsis--words": basedOn === "words",
        },
        `text-elipsis--${maxLines}`,
        `text-elipsis--${ellipsis}`,
        `text-elipsis--${color}`
      )}
      style={style}
      {...componentProps}
      dangerouslySetInnerHTML={{
        __html: isDangerous ? text : undefined,
      }}
    />
  );
};

export default TextElipsis;
