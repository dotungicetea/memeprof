import { PointReasons } from "@/app/lib/constants";
import z from "zod";
import { prisma } from "../../../../../../utils/prisma";

const requestSchema = z.object({
  userId: z.string({
    required_error: "userId is required",
  }),
  optionId: z.string({
    required_error: "optionId is required",
  }),
});

export const POST = async (req: Request) => {
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

  try {
    // check first if the request has json body
    if (!req.body) {
      return Response.json(
        { error: "Request body is required" },
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

    const body = await req.json();

    const safeBody = requestSchema.safeParse(body);
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

    const option = await prisma.gameOption.findUnique({
      where: {
        id: safeBody.data.optionId,
      },
    });

    if (!option) {
      return Response.json(
        { error: "Option not found" },
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

    await prisma.point.create({
      data: {
        userId: safeBody.data.userId,
        amount: option.rewardAmount!,
        pointReason: PointReasons.GAME_REWARD,
      },
    });

    const totalPoints = await prisma.point.aggregate({
      where: {
        userId: safeBody.data.userId,
      },
      _sum: {
        amount: true,
      },
    });

    return Response.json(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        level: user.level,
        totalScore: totalPoints._sum.amount,
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
    return Response.json({ error: "An error occurred" }, { status: 500 });
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
