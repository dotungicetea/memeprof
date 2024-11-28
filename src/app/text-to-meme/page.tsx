"use client";

import { Box } from "@/components/Box";
import Memes from "./components/TextToMeme";

// styles
import classnames from "classnames/bind";
import styles from "./page.module.scss";
const cn = classnames.bind(styles);

export const dynamic = "force-dynamic";

const TextToMemePage = () => {
  return (
    <Box className={cn("memes")}>
      <Memes />
    </Box>
  );
};

export default TextToMemePage;
