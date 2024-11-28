"use server";

import { getUserPoints } from "@/app/api/common/levelHelpers";
import { prisma } from "@/utils/prisma";

export const completeTask = async (taskPayload: string, userId: string) => {
  const task = await prisma.verification.findFirst({
    where: {
      payload: taskPayload,
    },
  });

  if (!task) return;

  if (taskPayload === "InviteFiveFriends") {
    if (task?.isCompleted) {
      return;
    }

    const invitesCount = await prisma.user.count({
      where: {
        referredById: String(userId),
      },
    });

    if (invitesCount >= 5) {
      await prisma.point.create({
        data: {
          userId: String(userId),
          amount: 500,
          pointReason: task.payload ?? "InviteFiveFriends",
        },
      });

      const { currentLevel } = await getUserPoints(String(userId));

      await prisma.user.update({
        where: { id: String(userId) },
        data: { level: currentLevel },
      });
    }

    return;
  }

  if (taskPayload === "WriteXThread") {
    if (task?.isCompleted) {
      return;
    } else {
      //   const threadsCount = await prisma.thread.count({
      //     where: {
      //       authorId: String(userId),
      //     },
      //   });
      //   if (threadsCount >= 1) {
      //     await prisma.point.create({
      //       data: {
      //         userId: String(userId),
      //         amount: 500,
      //         pointReason: task.payload ?? "WriteXThread",
      //       },
      //     });
      //     await prisma.verification.update({
      //       where: {
      //         id: task.id,
      //       },
      //       data: {
      //         isCompleted: true,
      //       },
      //     });
      //     const { currentLevel } = await getUserPoints(String(userId));
      //     await prisma.user.update({
      //       where: { id: String(userId) },
      //       data: { level: currentLevel },
      //     });
      //   }
      //   return;
    }

    return;
  }

  if (task.rewardAmount && task.payload) {
    await prisma.point.create({
      data: {
        userId: String(userId),
        amount: task.rewardAmount,
        pointReason: task.payload,
      },
    });
  }
};
