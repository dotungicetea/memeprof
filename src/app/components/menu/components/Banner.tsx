"use client";

import { Box } from "@/components/Box";
import Paper from "@/components/Paper";
import classNames from "classnames/bind";
import styles from "./banner.module.scss";

import Button from "@/components/Button";
import Icon from "@/components/Icon";
import RippleBase from "@/components/RippleBase";
import { Typography } from "@/components/Typography";
import { Game } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const cn = classNames.bind(styles);

type Props = {
  data?: Game[];
};

const Banner: FC<Props> = ({ data }) => {
  const router = useRouter();

  const onClick = (ad: Game) => {
    router.push(`/games/${ad.id}`);
  };

  if (!data?.length) return null;

  return (
    <Box className={cn("banner__wrapper")}>
      <Box className="w-full flex justify-between items-center pb-1">
        <Typography variant="h4" className={cn("banner__title")}>
          Games for you
        </Typography>
        <Button
          variant="text"
          className={cn("flex !w-auto !px-0")}
          onClick={() => router.push("/games")}
        >
          View all
          <Icon className={cn("banner__action-icon")} icon="arrow" />
        </Button>
      </Box>
      <Swiper spaceBetween={10} slidesPerView={1.25} className={cn("swiper")}>
        {data?.map((item, index) => (
          <SwiperSlide key={index} className={cn("banner__slide")}>
            <RippleBase
              component={Paper}
              onClick={() => onClick(item)}
              className={cn("banner")}
              style={{
                backgroundImage: `url(${item.imageUrl})`,
                backgroundPosition: "center",
                backgroundSize: "contain",
              }}
            >
              <Box className={cn("banner__content")}>
                <Box className={cn("flex gap-2")}>
                  <Icon className={cn("banner__icon")} icon="play" />
                  {item.title}
                </Box>
              </Box>
            </RippleBase>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Banner;
