import { NextRequest } from "next/server";
import { prisma } from "../../../../utils/prisma";

export const GET = async (req: NextRequest) => {
  const xApiAuthKey = req.headers.get("X-API-Auth-Key");
  const secret = process.env.API_AUTH_KEY;

  if (xApiAuthKey !== secret) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const games = await prisma.game.findMany({
    where: {
      enabled: true,
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

      // options: {
      //   where: {
      //     enabled: true,
      //   },

      //   select: {
      //     id: true,
      //     gameId: true,
      //     title: true,
      //     description: true,
      //     createdAt: true,
      //     rewardAmount: true,
      //     updatedAt: true,
      //     imageUrl: true,
      //   },
      // },
    },
  });

  try {
    return Response.json(games, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-API-Auth-Key",
      },
    });
  } catch (error) {
    console.error(error);
  }
};
