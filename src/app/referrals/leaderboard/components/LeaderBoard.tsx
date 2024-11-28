"use client";

import useBackButton from "@/components/BackButton/useBackButton";
import { Box } from "@/components/Box";
import Sticker from "@/components/Sticker";
import { Typography } from "@/components/Typography";
import { ActionButton } from "@/packages/mini-app/components/action-button/ActionButton";
import { TopPointUsersProps } from "@/types/userType";
import { getTelegram } from "@/utils/getters";
import classnames from "classnames/bind";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { FormattedMessage } from "react-intl";
import styles from "./LeaderBoard.module.scss";
import LeaderBoardList from "./LeaderBoardList";

const cn = classnames.bind(styles);

const LeaderBoard: FC<TopPointUsersProps> = ({ TopPointUsers }) => {
  const telegram = getTelegram();

  const router = useRouter();

  useBackButton({
    isBackable: true,
    onClick: router.back,
  });

  return (
    <>
      <Box className={cn("leaderboard")}>
        <Box className={cn("leaderboard__top")}>
          <Sticker name="leaders" width={100} height={100} />
          <Typography variant="h2">Top Leaders</Typography>
          <Typography
            className={cn("leaderboard__top-subtitle")}
            variant="caption"
          >
            Invite more friends to get there
          </Typography>
        </Box>

        <LeaderBoardList TopPointUsers={TopPointUsers} />

        <ActionButton
          className={cn("referral__action")}
          onClick={() => {
            telegram?.openLink(
              `https://t.me/${process.env.NEXT_PUBLIC_BOT_USERNAME}?start=refer`
            );
          }}
        >
          <FormattedMessage id="inviteFrens" />
        </ActionButton>
      </Box>
    </>
  );
};

export default LeaderBoard;
