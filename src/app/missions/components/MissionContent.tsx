"use client";

import { Box } from "@/components/Box";
import Popup from "@/components/Popup";
import RippleBase from "@/components/RippleBase";
import { Typography } from "@/components/Typography";
import { ActionButton } from "@/packages/mini-app/components/action-button/ActionButton";
import {
  selectSnackbarShow,
  useSnackbar,
} from "@/packages/mini-app/components/snackbar/useSnackbar";
import { getTelegram } from "@/utils";
import { User } from "@/utils/getSingleUser";
import classNames from "classnames/bind";
import Image from "next/image";
import { useState } from "react";
import Countdown from "react-countdown";
import { claimDailyReward } from "../lib/mission-actions";
import styles from "./MissionContent.module.scss";

const cn = classNames.bind(styles);

const renderer = ({
  hours,
  minutes,
  seconds,
  completed,
  rewardRate,
  onClick,
}: {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
  rewardRate: number;
  onClick?: () => void;
}) => {
  if (completed) {
    // Render a complete state
    return (
      <RippleBase
        className={cn("mission-content__button")}
        component={Box}
        onClick={onClick}
      >
        <Box
          className={cn("start-button")}
          // onClick={handleClaimClick}
        >
          CLAIM - {rewardRate} $PROF
        </Box>
      </RippleBase>
    );
  } else {
    // Render a countdown

    return (
      <Box className={cn("mission-content__button")}>
        <Box
          className={cn("start-button", "start-button--disabled")}
          // onClick={handleClaimClick}
        >
          CLAIM in - {hours}:{minutes}:{seconds}
        </Box>
      </Box>
    );
  }
};

const MissionContent = ({
  user,
  refetch,
}: {
  user?: User;
  refetch: VoidFunction;
}) => {
  const telegram = getTelegram();
  const show = useSnackbar(selectSnackbarShow);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  const handleClaimClick = async () => {
    telegram?.HapticFeedback?.impactOccurred?.("medium");
    if (!user) return;

    try {
      setIsClaiming(true);
      const updatedUser = await claimDailyReward(
        user.id,
        user.rewardRate,
        new Date()
      );
      show("Successfully claimed daily reward", {
        variant: "success",
      });

      refetch();
      setIsPopupVisible(false);
      setIsClaiming(false);
    } catch (e) {
      setIsClaiming(false);
      show("Failed to claim daily reward", {
        variant: "error",
      });
    }
  };

  const onClaimClick = () => {
    setIsPopupVisible(true);
  };

  return (
    <Box className={cn("mission-content")}>
      <Box className={cn("mission-intro")}>
        <Typography variant="h1" className={cn("mission-intro__heading")}>
          Daily Reward
        </Typography>

        <Typography className={cn("invite__content")} variant="caption">
          Reward rate 🪙 +${user?.rewardRate} $PROF
        </Typography>
      </Box>

      <Countdown
        date={user?.nextClaimDate ?? 0}
        renderer={(props) =>
          renderer({
            ...props,
            rewardRate: user?.rewardRate ?? 0,
            onClick: onClaimClick,
          })
        }
      />

      <Popup
        open={isPopupVisible}
        onClose={() => {
          setIsPopupVisible(false);
        }}
        title="Daily Reward"
      >
        <Box className={cn("text-center mx-auto !w-24 !h-24 relative")}>
          <Image src="/images/watermark.png" fill alt="" />
        </Box>
        <Typography variant="h4" className={cn("text-center my-3")}>
          Claim your daily reward, Earn & increase your reward rate
        </Typography>
        <ActionButton
          isLoading={isClaiming}
          isFixed={false}
          onClick={handleClaimClick}
        >
          Claim
        </ActionButton>
      </Popup>
    </Box>
  );
};

export default MissionContent;
