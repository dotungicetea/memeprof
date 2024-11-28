import { PointReasons } from "@/app/lib/constants";
import { prisma } from "@/utils/prisma";
import { Level } from "@prisma/client";
import { NextRequest } from "next/server";

const REFERRAL_ONE_USER = 100;
const INDIRECT_INVITE_POINTS = 20;

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

export async function POST(req: NextRequest) {
  try {
    const { userId, referrer, first_name, last_name, username } =
      await req.json();

    console.log(
      "register-userId",
      userId,
      referrer,
      first_name,
      last_name,
      username
    );

    if (!userId) {
      return Response.json({ error: "Invalid request" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (existingUser) {
      try {
        const { currentLevel } = await getUserPoints(String(userId));

        if (currentLevel !== existingUser.level) {
          await prisma.user.update({
            where: {
              id: userId,
            },
            data: {
              level: currentLevel,
            },
          });
        }
      } catch (error) {
        console.error("error level check", error);
      }

      return Response.json(existingUser, { status: 200 });
    }

    const referredUser = await prisma.user.findUnique({
      where: {
        id: referrer || "NULL",
      },
    });

    const newUser = await prisma.user.create({
      data: {
        id: userId,
        firstName: first_name,
        lastName: last_name,
        username,
        ...(referredUser && {
          referredById: referrer,
        }),
      },
    });

    if (referredUser) {
      await prisma.point.create({
        data: {
          amount: REFERRAL_ONE_USER,
          pointReason: PointReasons.REFERRAL,
          userId: referrer,
        },
      });

      if (referredUser?.referredById) {
        await prisma.point.create({
          data: {
            amount: INDIRECT_INVITE_POINTS,
            pointReason: PointReasons.INDIRECT_REFERRAL,
            userId: referrer.referredById,
          },
        });
      }
    }

    return Response.json(newUser, { status: 200 });
  } catch (error) {
    console.error("error fetching user", error);

    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
