"use client";

import Avatar from "@/components/Avatar/Avatar";
import useBackButton from "@/components/BackButton/useBackButton";
import { Box } from "@/components/Box";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import RippleBase from "@/components/RippleBase";
import { Typography } from "@/components/Typography";
import { getTelegram, getTgUser } from "@/utils";
import {
  ContestTask,
  LinkVariant,
  PendingRewardStatus,
  Prisma,
  TaskType,
} from "@prisma/client";
import classNames from "classnames/bind";
import { formatDuration, intervalToDuration } from "date-fns";
import { useRouter } from "next/navigation";
import { SyntheticEvent } from "react";
import ContestCard from "../../components/ContestCard";
import { onTaskClaim, onTaskClick } from "../lib/actions";
import styles from "./contest-details.module.scss";

const cn = classNames.bind(styles);

type Props = {} & Prisma.ContestGetPayload<{
  include: {
    contestTaskSets: {
      include: {
        tasks: {
          include: {
            pendingRewards: true;
          };
        };
      };
    };
  };
}>;

const ContestDetails = ({
  avatarUrl,
  contentTitle,
  description,
  endDate,
  imageUrl,
  rewardTitle,
  shortDescription,
  title,
  createdAt,
  updatedAt,
  enabled,
  id,
  isActive,
  isEnded,
  rewardAmount,
  rewardAvatarUrl,
  startDate,
  contestTaskSets,
}: Props) => {
  const router = useRouter();
  const telegram = getTelegram();
  const tgUser = getTgUser();

  useBackButton({
    isBackable: true,
    onClick: router.back,
  });

  const onClickTask =
    (task: ContestTask, isDisabled: boolean) => async (e: SyntheticEvent) => {
      if (isDisabled) return;

      if (task.type === TaskType.SUBSCRIPTION) {
        if (task.linkVariant === "TELEGRAM") {
          telegram?.openLink(task.url!);
        } else if (task.linkVariant === LinkVariant.TELEGRAM_BACKABLE) {
          telegram?.openTelegramLink(task.url!);
        }

        await onTaskClick(task.id, String(tgUser?.user?.id));
      } else if (task.type === TaskType.MEME_GEN) {
        router.push(`/memegpt?contestId=${id}&taskId=${task.id}`);
      }
    };

  const handleClickClaim = (rewardId: string) => async (e: SyntheticEvent) => {
    e?.preventDefault();
    e?.stopPropagation();

    await onTaskClaim(rewardId, id, String(tgUser?.user?.id));
  };

  return (
    <Box className={cn("contest")}>
      <Box className={cn("contest__header")}>
        <ContestCard
          shouldRenderFooter={false}
          key={id}
          {...{
            id,
            title,
            avatarUrl,
            contentTitle,
            description,
            imageUrl,
            rewardTitle,
            endDate,
            shortDescription,
            rewardAmount,
            rewardAvatarUrl,
            isEnded,
            createdAt,
            enabled,
            isActive,
            startDate,
            updatedAt,
          }}
        />
      </Box>

      <div>
        <h4>{title}</h4>
        <Typography
          variant="caption"
          className={cn("contest__task-description")}
        >
          {description}
        </Typography>
        <Box className={cn("contest__timer")}>
          <Icon icon="timer" />{" "}
          {formatDuration(
            intervalToDuration({
              start: new Date(),
              end: new Date(endDate),
            }),
            {
              format: ["days", "hours"],
              delimiter: ", ",
              zero: false,
            }
          )}{" "}
          {"left"}
        </Box>
      </div>
      {contestTaskSets?.map((taskSet) => (
        <Box key={taskSet.id} className={cn("contest__task-set")}>
          <Typography variant="h3" className={cn("contest__task-set__title")}>
            {taskSet.title}
          </Typography>
          <Box className={cn("contest__task-list")}>
            {taskSet?.tasks?.map((task) => (
              <RippleBase
                disableRipple={!!task.pendingRewards?.[0]}
                key={task.id}
                className={cn("contest__task")}
                onClick={onClickTask(task, !!task.pendingRewards?.[0])}
              >
                <Avatar
                  url={task.imageUrl!}
                  name={task.title}
                  className={cn("contest__task__image")}
                />

                <Typography
                  variant="button"
                  className={cn("contest__task__title", {
                    "contest__task__title--finished":
                      !!task.pendingRewards?.[0],
                  })}
                >
                  {task.title}
                </Typography>

                {task.pendingRewards?.[0]?.status ===
                PendingRewardStatus.PENDING ? (
                  <Button
                    variant="text"
                    className={cn("contest__task__action-btn")}
                    onClick={handleClickClaim(task.pendingRewards[0]?.id)}
                  >
                    Claim
                  </Button>
                ) : null}

                {!task.pendingRewards?.length ? (
                  <Icon
                    icon="arrow-right"
                    className={cn("contest__task__icon")}
                  />
                ) : null}

                {task.pendingRewards?.[0]?.status ===
                PendingRewardStatus.CLAIMED ? (
                  <Icon
                    icon="tick-circle"
                    className={cn("contest__task__icon")}
                  />
                ) : null}
              </RippleBase>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ContestDetails;
