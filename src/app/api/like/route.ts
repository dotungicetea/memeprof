import { prisma } from "../../../utils/prisma";

export const POST = async (req: Request) => {
  const { memeId, userId } = await req.json();

  try {
    const like = await prisma.meme.update({
      where: {
        id: memeId,
      },
      data: {
        likes: {
          create: {
            userId,
          },
        },
      },
    });

    return Response.json(like.createdById.toString(), { status: 200 });
  } catch (error) {
    console.error(error);
  }
};
