"use server";

import { PointReasons } from "@/app/lib/constants";
import { prisma } from "@/utils/prisma";

const REWARD_DAILY_INCREASE_RATE = 25;

export const claimDailyReward = async (
  userId: string,
  rewardRate: number,
  date: Date
) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      totalBalance: {
        increment: rewardRate,
      },
      rewardLastClaimedAt: date,
      rewardRate: {
        increment: REWARD_DAILY_INCREASE_RATE,
      },
    },
  });

  return user;
};

export const claimInvitationReward = async (userId: string) => {
  const hasExistingPoint = await prisma.point.findFirst({
    where: {
      pointReason: PointReasons.INVITE_FIVE_FRIENDS,
      userId,
    },
  });

  if (hasExistingPoint) {
    return hasExistingPoint;
  }

  const point = await prisma.point.create({
    data: {
      userId,
      amount: 12000,
      pointReason: PointReasons.INVITE_FIVE_FRIENDS,
    },
  });

  return point;
};
