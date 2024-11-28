"use client";

import Lottie from "lottie-react";
import React from "react";
import StickerSkeleton from "../Skeleton/StikerSkeleton/StickerSkeleton";
import { StickerId } from "./constants";

type Props = {
  name: StickerId;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
};

const Sticker = ({ name, width = 250, height = 250 }: Props) => {
  const stickerData = require(`@/assets/animated-stickers/${name}.json`);

  return (
    <div
      style={{
        width,
        height,
        margin: "0px auto",
      }}
    >
      {stickerData ? (
        <Lottie animationData={stickerData} />
      ) : (
        <StickerSkeleton width={width} height={height} borderRadius="50%" />
      )}
    </div>
  );
};

export default Sticker;
