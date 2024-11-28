"use client";

import useBackButton from "@/components/BackButton/useBackButton";
import { Box } from "@/components/Box";
import { Typography } from "@/components/Typography";
import { useRouter } from "next/navigation";
import Games from "./components/Games";
import classNames from "classnames/bind";
import styles from "./games.module.scss";

const cn = classNames.bind(styles);

const GamesPage = () => {
  const router = useRouter();

  useBackButton({
    isBackable: true,
    onClick: router.back,
  });

  return (
    <Box>
      <Box className={cn("games__header")}>
        <Typography variant="h2" className={cn("games__title")}>
          Games for you
        </Typography>
      </Box>
      <Games />
    </Box>
  );
};

export default GamesPage;
