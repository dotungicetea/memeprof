"use server";

import { PointReasons } from "@/app/lib/constants";
import { prisma } from "@/utils/prisma";
import { PendingRewardStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const onTaskClick = async (taskId: string, userId: string) => {
  const pendingReward = await prisma.pendingReward.create({
    data: {
      taskId,
      userId,
      amount: 0,
      status: PendingRewardStatus.PENDING,
    },
  });

  revalidatePath(`/contest`);
  return pendingReward;
};

export const onTaskClaim = async (
  rewardId: string,
  contestId: string,
  userId: string
) => {
  const updatedReward = await prisma.pendingReward.update({
    where: { id: rewardId },
    data: {
      status: PendingRewardStatus.CLAIMED,
    },
  });

  revalidatePath(`/contest`);

  const currentContest = await prisma.contest.findUnique({
    where: {
      id: contestId,
    },
  });

  const tasksToComplete = await prisma.contestTask.findMany({
    where: {
      contestTaskSet: {
        contestId,
      },

      pendingRewards: {
        some: {
          status: {
            not: PendingRewardStatus.CLAIMED,
          },
          userId,
        },
      },
    },
  });

  if (!tasksToComplete.length) {
    const existingReward = await prisma.point.findUnique({
      where: {
        id: `${PointReasons.CONTEST}-${contestId}-${userId}`,
        pointReason: PointReasons.CONTEST,
      },
    });

    if (!existingReward) {
      await prisma.point.create({
        data: {
          id: `${PointReasons.CONTEST}-${contestId}-${userId}`,
          userId,
          amount: currentContest?.rewardAmount,
          pointReason: PointReasons.CONTEST,
        },
      });
    }
  }

  return updatedReward;
};
