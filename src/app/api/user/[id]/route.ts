import { NextRequest } from "next/server";
import { prisma } from "../../../../utils/prisma";

export async function GET(
  req: NextRequest,
  {
    params,
    searchParams,
  }: {
    params: { id: string };
    searchParams: {
      memes: boolean;
      followers: boolean;
      following: boolean;
    };
  }
) {
  try {
    const [user, totalPoints] = await prisma.$transaction([
      prisma.user.findUnique({
        where: {
          id: String(params?.id),
        },

        include: {
          referredUsers: {
            select: {
              firstName: true,
              lastName: true,
              username: true,
              id: true,
              level: true,
              referredById: true,
            },
          },
          memes: {
            where: {
              isPublished: true,
            },
            select: {
              isPublished: true,
              id: true,
              caption: true,
            },
          },
          followers: true,
          following: true,
        },
      }),
      prisma.point.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          userId: String(params?.id),
        },
      }),
    ]);

    const nextClaimDate = new Date(user?.rewardLastClaimedAt?.getTime() ?? 0);

    if (user?.rewardLastClaimedAt) {
      nextClaimDate.setHours(nextClaimDate.getHours() + 12);
    }

    return Response.json(
      {
        ...user,
        totalPoints:
          (totalPoints?._sum?.amount ?? 0) + (user?.totalBalance ?? 0),
        nextClaimDate,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("error fetching user", error);

    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
