import { serialize } from "@/app/lib/helpers";
import { prisma } from "../../../utils/prisma";

const getString = (id: string | number | null | undefined) => {
  if (!id) return undefined;

  if (id === "undefined") return undefined;
  if (id === "null") return undefined;

  return String(id);
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page")) || 1;
  const userId = searchParams.get("userId");
  const createdById = searchParams.get("createdById");
  const filter = searchParams.get("filter");

  try {
    const memes = await prisma.meme.findMany({
      where: {
        hidden: false,
        ...(getString(createdById) && {
          createdById: getString(createdById),
        }),
        ...(filter === "following" && {
          createdBy: {
            followers: {
              some: {
                id: getString(userId),
              },
            },
          },
        }),
        ...(filter === "publ" && {
          isPublished: true,
        }),
        ...(filter === "unpubl" && {
          isPublished: false,
        }),
      },

      include: {
        createdBy: {
          select: {
            followers: {
              where: {
                id: getString(userId),
              },
              select: {
                id: true,
                level: true,
              },
            },
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            level: true,
          },
        },
        likes: {
          where: {
            userId: getString(userId),
          },
          select: {
            userId: true,
            id: true,
            memeId: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
      skip: page * 10 - 10,
    });

    return Response.json(serialize(memes), { status: 200 });
  } catch (error) {
    console.error("error fetching memes", error);

    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
