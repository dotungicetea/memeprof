"use client";

import { Box } from "@/components/Box";
import Icon from "@/components/Icon";
import { Typography } from "@/components/Typography";
import classNames from "classnames/bind";
import styles from "./BonusHeader.module.scss";
import { FormattedMessage } from "react-intl";

const cn = classNames.bind(styles);

const BonusHeader = () => {
  return (
    <Box className={cn("bonus-header")}>
      <Typography variant="h2" className={cn("bonus-header__title")}>
        <FormattedMessage id="inviteFriendGetBonus" />
      </Typography>
      <Box className={cn("bonus-header__items")}>
        <Box className={cn("bonus-header__item")}>
          <Box className={cn("bonus-header__item--sticker")}>
            <Icon
              className={cn("bonus-header__item--sticker--icon")}
              icon="medal"
              size="lg"
            />
          </Box>
          <div>
            <Typography
              className={cn("bonus-header__item--title")}
              variant="h4"
            >
              <FormattedMessage id="inviteFriend" />
            </Typography>
            <Typography
              className={cn("bonus-header__item--text")}
              variant="caption"
            >
              <span className={cn("bonus-header__item--text--number")}>
                2,500
              </span>
              <span>for you and friend</span>
            </Typography>
          </div>
        </Box>
        <Box className={cn("bonus-header__item")}>
          <Box className={cn("bonus-header__item--sticker")}>
            <Icon
              className={cn("bonus-header__item--sticker--icon")}
              icon="indirect"
              size="lg"
            />
          </Box>
          <div>
            <Typography
              className={cn("bonus-header__item--title")}
              variant="h4"
            >
              <FormattedMessage id="inviteFriend" />
            </Typography>
            <Typography
              className={cn("bonus-header__item--text")}
              variant="caption"
            >
              <span className={cn("bonus-header__item--text--number")}>
                1,500
              </span>
              <span>for you and friend</span>
            </Typography>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default BonusHeader;
