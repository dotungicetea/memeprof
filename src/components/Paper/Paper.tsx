import classNames from "classnames/bind";
import React from "react";
import styles from "./Paper.module.scss";

const cn = classNames.bind(styles);

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Paper = (props: Props) => {
  return <div {...props} className={cn("paper", props.className)} />;
};

export default Paper;
