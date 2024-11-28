import { NextRequest } from "next/server";
import { prisma } from "../../../../utils/prisma";

export async function GET(req: NextRequest) {
  try {
    const quests = await prisma.contest.findMany();

    return Response.json(quests, { status: 200 });
  } catch (error) {
    console.error("error fetching user", error);

    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
