import { NextRequest } from "next/server";
import { prisma } from "../../../../utils/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log("request tot meme id", params);
    const meme = await prisma.meme.findMany({
      where: {
        createdById: String(params?.id ?? 0),
        isPublished: true,
      },

      select: {
        id: true,
        url: true,
        caption: true,
      },
    });

    return Response.json(meme, { status: 200 });
  } catch (error) {
    console.error("error api memes", error);

    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
