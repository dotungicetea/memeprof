import React from "react";
import classNames from "classnames/bind";
import styles from "./games.module.scss";
import { Box } from "@/components/Box";
import GameItem from "./GameItem";

const cn = classNames.bind(styles);

type Props = {};

const Games = (props: Props) => {
  return (
    <Box className={cn("games", "gap-2")}>
      <GameItem
        id="spin-the-wheel"
        name="Spin the wheel"
        image="https://memes.sgp1.cdn.digitaloceanspaces.com/games/spinner.png"
      />
      <GameItem
        id="bubblefloat"
        name="BubbleFloat"
        image="https://memes.sgp1.cdn.digitaloceanspaces.com/games/bubblefloat.png"
      />
    </Box>
  );
};

export default Games;
