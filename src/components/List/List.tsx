import React, { FC } from "react";
import styles from "./list.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

type Props = {
  children?: React.ReactNode;
};

const List: FC<Props> = ({ children }) => {
  return <ul className={cn("list")}>{children}</ul>;
};

export default List;
