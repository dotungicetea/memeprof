"use client";

import { Box } from "@/components/Box";
import { Typography } from "@/components/Typography";
import classNames from "classnames/bind";
import { useState } from "react";
import styles from "./MissionInviteFriends.module.scss";
const cn = classNames.bind(styles);

import Image from "next/image";

import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Popup from "@/components/Popup";
import { Progress } from "@/components/ProgressBar";
import RippleBase from "@/components/RippleBase";
import { ActionButton } from "@/packages/mini-app/components/action-button/ActionButton";
import {
  selectSnackbarShow,
  useSnackbar,
} from "@/packages/mini-app/components/snackbar/useSnackbar";
import { getTelegram } from "@/utils";
import { User } from "@/utils/getSingleUser";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { tasks } from "../constants";
import { claimInvitationReward } from "../lib/mission-actions";

const fetcher = async (userId: string) => {
  const res = await fetch(`/api/user/${userId}/mission`);

  return res.json();
};

const MissionInviteFriends = ({
  user,
  refetch,
}: {
  user?: User;
  refetch: VoidFunction;
}) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isClaiming, setClaiming] = useState(false);
  const router = useRouter();
  const telegram = getTelegram();
  const show = useSnackbar(selectSnackbarShow);

  const { data } = useSWR("mission", () => fetcher(user?.id!));

  const isTaskReady = user?.referredUsers?.length! >= 1;
  const isClaimable = isTaskReady && !data?.existingPoint;

  const handleClaimClick = async () => {
    try {
      telegram?.HapticFeedback.impactOccurred("light");
      setClaiming(true);
      await claimInvitationReward(user?.id!);
      setClaiming(false);
      setDrawerOpen(false);
      refetch();

      show("Reward claimed successfully", { variant: "success" });
    } catch (error) {
      show("Failed to claim reward", { variant: "error" });
    }
  };

  return (
    <Box className={cn("mission")}>
      <BackButton isBackable onClick={() => router.push("/menu")} />
      <Box className={cn("mission__header")}>
        <Typography variant="h1">
          Missions
          <span className={cn("mission__task-count")}>{tasks.length}</span>
        </Typography>

        <Typography
          className={cn("mission__description")}
          style={{
            color: "#a8a8a8",
            fontSize: "14px",
          }}
        >
          We’ll reward you immediately with points after each mission
          completion.
        </Typography>
      </Box>

      <Box className={cn("mission__task-list")}>
        <RippleBase
          component={Box}
          className={cn("mission__task-container")}
          onClick={() => {
            telegram?.HapticFeedback.impactOccurred("light");
            if (isClaimable) {
              setDrawerOpen(true);
            } else if (!data?.existingPoint) {
              telegram?.openLink(
                `https://t.me/share/url?text=🎉 Join MemeProf and Start Earning Today! 🎉

🔗 Click here to get started: Join MemeProf

Don't miss out on the fun and rewards!&url=https://t.me/memeprofbot/start?startapp=rid${user?.id}`
              );
            }
          }}
        >
          <Box className={cn("mission__task-content-box")}>
            {/* ICON */}
            <div className={cn("mission__task-content")}>
              <Icon icon="invite" className={cn("mission__task-logo")} />

              <div>
                <Typography variant="h4" className={cn("mission__task-title")}>
                  Invite 5 Friends
                </Typography>
                <Typography
                  className={cn("mission__description")}
                  style={{
                    color: "#e9ecef",
                    fontSize: "14px",
                  }}
                >
                  {user?.referredUsers.length}/{5} friends, 12000 $PROF
                </Typography>
              </div>
            </div>

            <div className={cn("mission__claim-container")}>
              {isClaimable ? (
                <Button
                  variant="text"
                  className={cn("contest__task__action-btn")}
                >
                  Claim
                </Button>
              ) : null}
              {!isClaimable && !data?.existingPoint ? (
                <Icon
                  icon="arrow-right"
                  className={cn("mission__claim-icon")}
                />
              ) : null}
              {!!data?.existingPoint ? (
                <Icon
                  icon="tick-circle"
                  className={cn("mission__complete-icon")}
                />
              ) : null}
            </div>
          </Box>
          <Progress
            bgColor="bg-gray-200"
            gradientColor={"#a1df24"}
            value={Math.min((user?.referredUsers?.length! / 5) * 100, 100)}
          />
        </RippleBase>
      </Box>

      <Popup
        open={isDrawerOpen}
        onClose={() => {
          setDrawerOpen(false);
        }}
        title="Invite 5 Friends"
        subtitle="Invitation will be rewarded most generously"
      >
        <Box className={cn("text-center mx-auto !w-24 !h-24 relative")}>
          <Image src="/images/watermark.png" fill alt="" />
        </Box>
        <Typography variant="h4" className={cn("text-center my-3")}>
          Invite 5 friends and earn 12000 $PROF
        </Typography>
        <ActionButton
          isFixed={false}
          isLoading={isClaiming}
          disabled={!isClaimable}
          onClick={handleClaimClick}
        >
          Claim
        </ActionButton>
      </Popup>
    </Box>
  );
};

export default MissionInviteFriends;
