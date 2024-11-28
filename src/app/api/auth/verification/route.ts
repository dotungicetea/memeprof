import { JOINING_REWARDS, PointReasons } from "@/app/lib/constants";
import { prisma } from "@/utils/prisma";
import { Api } from "grammy";
import { NextRequest } from "next/server";
import { getUserPoints } from "../../common/levelHelpers";

const channelId = process.env.CHANNEL_ID!;
const communityChatId = process.env.COMMUNITY_CHAT_ID!;

const ALLOWED_STATUSES = ["member", "creator", "administrator"];

const api = new Api(process.env.BOT_TOKEN!);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return Response.json({ error: "Invalid user id" }, { status: 400 });
  }

  const userId = String(id);

  console.log("checking verification for user", userId);

  try {
    const chatMember = await api.getChatMember(channelId, Number(id));
    const communityMember = await api.getChatMember(
      communityChatId,
      Number(id)
    );

    const [existingChannelPoint, existingCommunityPoint] =
      await prisma.$transaction([
        prisma.point.findFirst({
          where: {
            userId: userId,
            pointReason: PointReasons.JOIN_TO_CHANNEL,
          },
        }),
        prisma.point.findFirst({
          where: {
            userId: userId,
            pointReason: PointReasons.JOIN_TO_COMMUNITY,
          },
        }),
      ]);

    if (ALLOWED_STATUSES.includes(chatMember.status) && !existingChannelPoint) {
      await prisma.point.create({
        data: {
          userId,
          amount: JOINING_REWARDS.JOIN_CHANNEL,
          pointReason: PointReasons.JOIN_TO_CHANNEL,
        },
      });
      const { currentLevel } = await getUserPoints(userId);

      await prisma.user.update({
        where: { id: userId },
        data: { level: currentLevel },
      });
    }

    if (
      ALLOWED_STATUSES.includes(communityMember.status) &&
      !existingCommunityPoint
    ) {
      await prisma.point.create({
        data: {
          userId: userId,
          amount: JOINING_REWARDS.JOIN_CHAT,
          pointReason: PointReasons.JOIN_TO_COMMUNITY,
        },
      });
      const { currentLevel } = await getUserPoints(userId);

      await prisma.user.update({
        where: { id: userId },
        data: { level: currentLevel },
      });
    }
  } catch (error) {
    console.error("error fetching user checking point", error);
  }

  // try {
  //   const hasAlreadyDone = await prisma.point.findFirst({
  //     where: {
  //       userId,
  //       pointReason: PointReasons.INVITE_FRIENDS,
  //     },
  //   });

  //   if (!hasAlreadyDone) {
  //     const invitesCount = await prisma.user.count({
  //       where: {
  //         referredById: String(userId),
  //       },
  //     });

  //     if (invitesCount >= 5) {
  //       await prisma.point.create({
  //         data: {
  //           userId: String(userId),
  //           amount: 500,
  //           pointReason: PointReasons.INVITE_FRIENDS,
  //         },
  //       });

  //       const { currentLevel } = await getUserPoints(String(userId));

  //       await prisma.user.update({
  //         where: { id: String(userId) },
  //         data: { level: currentLevel },
  //       });
  //     }
  //   }
  // } catch (error) {
  //   console.error("error occured while checking invite point", error);
  // }

  try {
    const verifications = await prisma.verification.findMany({
      where: {
        isCompleted: false,
      },
    });

    const completedTasks = await prisma.point.findMany({
      where: {
        pointReason: {
          in: verifications.map((v) => v.payload ?? ""),
        },
        userId,
      },
    });

    const tasks = verifications.map((v) => ({
      ...v,
      isCompleted: completedTasks.some((t) => t.pointReason === v.payload),
    }));

    return Response.json(tasks, { status: 200 });
  } catch (error) {
    console.error("error fetching user", error);

    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
