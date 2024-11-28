"use server";

import { POINT_REASON } from "@/app/lib/constants";
import { prisma } from "@/utils/prisma";
import { PendingRewardStatus } from "@prisma/client";
import { existsSync, promises as fs } from "fs";
import path from "path";
import { uploadImage } from "./imageUpload";

export const saveMeme = async ({
  userId,
  prompt,
  caption,
  isPublished,
  taskId,
}: {
  userId: string;
  prompt: string;
  caption: string;
  isPublished: boolean;
  taskId?: Nullable<string>;
}) => {
  const folderPath = path.join(process.cwd(), "public", "memes", userId);
  const filePath = path.join(folderPath, "temp.png");
  const memePath = path.join(folderPath, "meme.png");

  if (
    !existsSync(folderPath) ||
    !existsSync(filePath) ||
    !existsSync(memePath)
  ) {
    throw new Error("Image not found");
  }

  const img = await fs.readFile(memePath);
  const url = await uploadImage(userId, img);

  if (!url) {
    throw new Error("Error occurred while uploading image");
  }

  const [meme, point] = await prisma.$transaction([
    prisma.meme.create({
      data: {
        url,
        createdById: String(userId),
        prompt,
        caption,
        isPublished,
      },
    }),

    prisma.point.create({
      data: {
        userId: String(userId),
        amount: isPublished ? 20 : 10,
        pointReason: isPublished
          ? POINT_REASON.SAVE_PUBLISH_COMBO
          : POINT_REASON.MEME_CREATED,
      },
    }),
  ]);

  if (taskId && isPublished) {
    prisma.pendingReward.create({
      data: {
        userId: String(userId),
        taskId,
        amount: 0,
        status: PendingRewardStatus.PENDING,
      },
    });
  }

  return meme;
};

export const publishMeme = async (
  memeId: string,
  userId: string,
  taskId?: Nullable<string>
) => {
  const [meme] = await prisma.$transaction([
    prisma.meme.update({
      where: {
        id: memeId,
      },
      data: {
        isPublished: true,
      },
    }),

    prisma.point.create({
      data: {
        amount: 10,
        userId: String(userId),
        pointReason: POINT_REASON.MEME_CREATED,
      },
    }),
  ]);

  if (taskId) {
    const pendingReward = await prisma.pendingReward.findUnique({
      where: {
        id: taskId,
        userId: userId,
      },
    });

    if (!pendingReward) {
      await prisma.pendingReward.create({
        data: {
          taskId,
          userId,
          amount: 0,
          status: PendingRewardStatus.PENDING,
        },
      });
    }
  }

  return meme;
};

export const unPublish = async (memeId: string, userId: string) => {
  const [meme] = await prisma.$transaction([
    prisma.meme.update({
      where: {
        id: memeId,
      },
      data: {
        isPublished: false,
      },
    }),

    prisma.point.create({
      data: {
        amount: -10,
        userId: String(userId),
        pointReason: POINT_REASON.MEME_UNPUBLISHED,
      },
    }),
  ]);

  return meme;
};

export const deleteMeme = async (
  memeId: string,
  userId: string,
  isPublished: boolean
) => {
  const [meme] = await prisma.$transaction([
    prisma.meme.delete({
      where: {
        id: memeId,
      },
    }),

    prisma.point.create({
      data: {
        amount: isPublished ? -20 : -10,
        userId: String(userId),
        pointReason: POINT_REASON.MEME_DELETED,
      },
    }),
  ]);

  return meme;
};
