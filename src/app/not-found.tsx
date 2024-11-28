"use client";

import useBackButton from "@/components/BackButton/useBackButton";
import { Box } from "@/components/Box";
import Button from "@/components/Button";
import { Typography } from "@/components/Typography";
import classNames from "classnames/bind";
import { useRouter } from "next/navigation";
import styles from "./not-found.module.scss";

const cn = classNames.bind(styles);

const NotFound = () => {
  const router = useRouter();

  useBackButton({
    isBackable: true,
    onClick: router.back,
  });

  return (
    <Box className={cn("root")}>
      <Typography>404 | NOT FOUND</Typography>

      <Box className="mt-4 flex justify-center items-center">
        <Button onClick={() => router.replace("/menu")}>Back to Menu</Button>
      </Box>
    </Box>
  );
};

export default NotFound;
