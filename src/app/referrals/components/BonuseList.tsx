import { Box } from "@/components/Box";
import Icon from "@/components/Icon";
import RippleBase from "@/components/RippleBase";
import { Typography } from "@/components/Typography";
import classNames from "classnames/bind";
import { useRouter } from "next/navigation";

import { FormattedMessage } from "react-intl";
import styles from "./BonuseList.module.scss";

const cn = classNames.bind(styles);

type Props = {};

const BonuseList = (props: Props) => {
  const router = useRouter();

  return (
    <Box className={cn("bonus")}>
      <Box className={cn("bonus__item")}>
        <Box className={cn("bonus__item-sticker")}>
          <Icon
            className={cn("bonus__item-sticker-icon")}
            icon="medal"
            size="lg"
          />
        </Box>
        <div>
          <Typography className={cn("bonus__item-title")} variant="h4">
            <FormattedMessage id="inviteFriend" />
          </Typography>
          <Typography className={cn("bonus__item-text")} variant="caption">
            <span className={cn("bonus__item-text-number")}>100</span>
            <span>
              <FormattedMessage id="forYou" />
            </span>
          </Typography>
        </div>
      </Box>
      <Box className={cn("bonus__item")}>
        <Box className={cn("bonus__item-sticker")}>
          <Icon
            className={cn("bonus__item-sticker-icon")}
            icon="indirect"
            size="lg"
          />
        </Box>
        <div>
          <Typography className={cn("bonus__item-title")} variant="h4">
            <FormattedMessage id="indirectInvite" />
          </Typography>
          <Typography className={cn("bonus__item-text")} variant="caption">
            <span className={cn("bonus__item-text-number")}>20</span>
            <span>
              <FormattedMessage id="forYouIfIndirect" />
            </span>
          </Typography>
        </div>
      </Box>
      <RippleBase
        className={cn("bonus__item-details")}
        onClick={() => {
          router.push("/referrals/bonuses");
        }}
      >
        <Typography variant="h4" className={cn("bonus__item-details-text")}>
          <FormattedMessage id="openDetails" />
        </Typography>
        <Icon
          icon="right"
          size="sm"
          className={cn("bonus__item-details-icon")}
        />
      </RippleBase>
    </Box>
  );
};

export default BonuseList;
