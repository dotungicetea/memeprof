"use client";

import { Typography } from "@/components/Typography";
import { getTelegram } from "@/utils";
import { Ad } from "@prisma/client";
import classNames from "classnames/bind";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import styles from "./AdsSlider.module.scss";
import Sticker from "@/components/Sticker";

const cn = classNames.bind(styles);

type AdsSliderProps = {
  ads: Ad[];
};

const AdsSlider: FC<AdsSliderProps> = ({ ads }) => {
  const telegram = getTelegram();

  const onClick = (ad: Ad) => {
    if (ad.variant === "default") {
      telegram?.openTelegramLink(ad.url);
    } else {
      telegram?.openLink(ad.url);
    }
  };

  if (!ads) return null;

  return (
    <div className={cn("slider")}>
      <p className={cn("slider__title")}></p>
      <Swiper spaceBetween={10} slidesPerView={1.2} className={cn("swiper")}>
        {ads.map((ad, index) => (
          <SwiperSlide key={index}>
            <div className={cn("ads__card")}>
              <div className={cn("ads__content")}>
                <div className={cn("ads__text")}>
                  <Typography variant="caption" className={cn("ads__title")}>
                    {ad.title}
                  </Typography>
                  <div className={cn("ads__link")} onClick={() => onClick(ad)}>
                    {ad?.actionButtonText ?? "Learn more"}
                  </div>
                </div>

                <div className={cn("ads__icon")}>
                  <Sticker
                    name={index % 2 === 0 ? "ads1" : "ads2"}
                    width={50}
                    height={50}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AdsSlider;
