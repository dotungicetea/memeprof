import { prisma } from "@/utils/prisma";
import { Level } from "@prisma/client";

export const levelChecker = (totalPoint: number) => {
  if (totalPoint >= 5000000) return Level.THE_PROFESSOR;
  if (totalPoint >= 2000000) return Level.MAESTRO;
  if (totalPoint >= 1000000) return Level.SAFECRACKER;
  if (totalPoint >= 500000) return Level.INFILTRATOR;
  if (totalPoint >= 200000) return Level.PHANTOM;
  if (totalPoint >= 100000) return Level.CRYPTOLOGIST;
  if (totalPoint >= 75000) return Level.HACKER;
  if (totalPoint >= 50000) return Level.WHEELMAN;
  if (totalPoint >= 10000) return Level.PLOTTER;
  if (totalPoint >= 1000) return Level.GRIFTER;

  return Level.NOOB;
};

export const getUserPoints = async (userId: string) => {
  const totalPoint = await prisma.point.aggregate({
    where: {
      userId: userId,
    },

    _sum: {
      amount: true,
    },
  });

  const currentLevel = levelChecker(totalPoint._sum.amount ?? 0);

  return { totalPoint, currentLevel };
};
