import classNames from "classnames/bind";
import React from "react";
import styles from "./Card.module.scss";

const cn = classNames.bind(styles);

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Card = (props: Props) => {
  return <div {...props} className={cn("card", props.className)} />;
};

export default Card;
