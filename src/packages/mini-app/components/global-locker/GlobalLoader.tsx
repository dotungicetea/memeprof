"use client";

import { Box } from "@/components/Box";
import { Typography } from "@/components/Typography";
import classNames from "classnames/bind";
import Image from "next/image";
import { FC } from "react";
import styles from "./global-loader.module.scss";

const cn = classNames.bind(styles);

type Props = {
  onBackdropClick?: () => void;
  title?: string;
  backdrop?: boolean;
};

const GlobalLoader: FC<Props> = ({
  onBackdropClick,
  title = "",
  backdrop = true,
}) => {
  return (
    <Box className={cn("global-locker")} onClick={onBackdropClick}>
      <Box className={cn("global-locker__content")}>
        <Box className={cn("global-locker__loader")}>
          <Image src="/assets/logos/logo.png" alt="logo" fill />
        </Box>
      </Box>
      <Typography variant="h6" className={cn("global-locker__text")}>
        {title}
      </Typography>
    </Box>
  );
};

export default GlobalLoader;
