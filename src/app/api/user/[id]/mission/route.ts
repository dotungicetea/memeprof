import { PointReasons } from "@/app/lib/constants";
import { NextRequest } from "next/server";
import { prisma } from "../../../../../utils/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const existingPoint = await prisma.point.findFirst({
      where: {
        pointReason: PointReasons.INVITE_FIVE_FRIENDS,
        userId: params.id,
      },
    });

    return Response.json(
      {
        existingPoint,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("error fetching user", error);

    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
