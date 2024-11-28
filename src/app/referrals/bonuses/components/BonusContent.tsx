"use client";

import { HOW_TO_EARN_POINTS, PROF_LEVEL_GUIDE, levels } from "@/app/constants";
import Icon from "@/components/Icon";
import RippleBase from "@/components/RippleBase";
import { Typography } from "@/components/Typography";
import { getTelegram } from "@/utils";
import classNames from "classnames/bind";
import { FormattedMessage } from "react-intl";
import styles from "./BonusContent.module.scss";

const cn = classNames.bind(styles);

const BonusContent = () => {
  return (
    <div className={cn("bonus-content")}>
      <Typography variant="h1">
        <FormattedMessage id="levelUpBonus" />
      </Typography>
      <Typography className={cn("bonus-content__heading")} variant="h3">
        <span>
          <FormattedMessage id="levelUp" />
        </span>
        <span>
          <FormattedMessage id="point" />
        </span>
      </Typography>

      <div className={cn("bonus-content__list")}>
        {levels.map((bonus) => (
          <div key={bonus.id} className={cn("bonus-content__item")}>
            <Typography
              variant="h3"
              style={{
                fontWeight: "normal",
              }}
            >
              {bonus.title}
            </Typography>
            <div className={cn("bonus-content__box")}>
              <div className={cn("bonus-content__box")}>
                <Icon
                  className={cn("bonus-content__icon")}
                  icon="coin"
                  size="sm"
                />
                <Typography variant="h4" className={cn("bonus-content__point")}>
                  {bonus.value}
                </Typography>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Typography
        variant="h2"
        className={cn("bonus-content__title")}
        style={{
          marginTop: "30px",
        }}
      >
        <FormattedMessage id="getMoreInfo" />
      </Typography>
      <div className={cn("bonus-content__actions")}>
        <RippleBase
          className={cn("bonus-content__button")}
          onClick={() => {
            const tg = getTelegram();

            tg?.openLink(PROF_LEVEL_GUIDE, {
              try_instant_view: true,
            });
          }}
        >
          <span className={cn("bonus-content__link")}>
            <FormattedMessage id="profLevelGuide" />
          </span>
          <Icon icon="right" size="sm" className={cn("bonus-content__icon")} />
        </RippleBase>
        <RippleBase
          className={cn("bonus-content__button")}
          onClick={() => {
            const tg = getTelegram();

            tg?.openLink(HOW_TO_EARN_POINTS, {
              try_instant_view: true,
            });
          }}
        >
          <span className={cn("bonus-content__link")}>
            <FormattedMessage id="earnPointInfo" />
          </span>
          <Icon icon="right" size="sm" className={cn("bonus-content__icon")} />
        </RippleBase>
      </div>
    </div>
  );
};

export default BonusContent;
