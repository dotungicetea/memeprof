import { NextRequest } from "next/server";
import { prisma } from "../../../../../../utils/prisma";

import * as z from "zod";
import { PointReasons } from "@/app/lib/constants";

const requestSchema = z.object({
  userId: z.string({
    required_error: "User ID is required",
  }),
});

export const POST = async (
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
    },
  });

  if (!game) {
    return Response.json(
      { error: "Game not found" },
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

  const safeBody = requestSchema.safeParse(await req.json());

  if (!safeBody.success) {
    return Response.json(
      { error: safeBody.error },
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

  const user = await prisma.user.findUnique({
    where: {
      id: safeBody.data.userId,
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
      userId: safeBody.data.userId,
    },
    _sum: {
      amount: true,
    },
  });

  if (totalPoints._sum?.amount! < game.cost) {
    return Response.json(
      { error: "Not enough balance" },
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

  try {
    await prisma.point.create({
      data: {
        userId: safeBody.data.userId,
        amount: -game.cost,
        pointReason: PointReasons.GAME_PLAY,
      },
    });

    return Response.json(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        level: user.level,
        totalScore: totalPoints._sum.amount! - game.cost,
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
