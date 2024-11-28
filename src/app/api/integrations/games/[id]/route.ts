import { NextRequest } from "next/server";
import { prisma } from "../../../../../utils/prisma";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const xApiAuthKey = req.headers.get("X-API-Auth-Key");
  const secret = process.env.API_AUTH_KEY;

  if (xApiAuthKey !== secret) {
    return Response.json(
      { error: "Unauthorized" },
      {
        status: 401,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers":
            "Content-Type, Authorization, X-API-Auth-Key",
        },
      }
    );
  }

  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  if (!params?.id) {
    return Response.json(
      { error: "Game ID is required" },
      {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers":
            "Content-Type, Authorization, X-API-Auth-Key",
        },
      }
    );
  }

  if (!userId) {
    return Response.json({ error: "User ID is required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return Response.json(
      { error: "User not found" },
      {
        status: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers":
            "Content-Type, Authorization, X-API-Auth-Key",
        },
      }
    );
  }

  const totalPoints = await prisma.point.aggregate({
    where: {
      userId: userId,
    },
    _sum: {
      amount: true,
    },
  });

  const game = await prisma.game.findUnique({
    where: {
      id: params.id,
    },

    select: {
      cost: true,
      id: true,
      icon: true,
      createdAt: true,
      updatedAt: true,
      title: true,
      imageUrl: true,
      description: true,

      options: {
        where: {
          enabled: true,
        },

        select: {
          id: true,
          gameId: true,
          title: true,
          description: true,
          createdAt: true,
          rewardAmount: true,
          updatedAt: true,
          imageUrl: true,
        },
      },
    },
  });

  try {
    return Response.json(
      {
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        level: user.level,
        totalScore: totalPoints._sum.amount,
        ...game,
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers":
            "Content-Type, Authorization, X-API-Auth-Key",
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export const OPTIONS = async () => {
  return Response.json(
    {},
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-API-Auth-Key",
      },
    }
  );
};
