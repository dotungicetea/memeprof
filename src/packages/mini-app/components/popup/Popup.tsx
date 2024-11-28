import { Box } from "@/components/Box";
import React from "react";
import styles from "./popup.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

type Props = {};

const Popup = (props: Props) => {
  return <Box className={cn("popup")}>Temp content</Box>;
};

export default Popup;
