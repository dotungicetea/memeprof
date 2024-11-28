"use server";

import { generateMeme } from "@/app/text-to-meme/lib/generateMeme";
import { prisma } from "@/utils/prisma";
import { existsSync } from "fs";
import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";
import { z } from "zod";
import { isEnglishAlphabet } from "./IsEnglishAlphabet";
import { StylePreset } from "../components/constants";

const schema = z.object({
  prompt: z.string().min(1, "Enter at least a character"),
  userId: z.string(),
});

const editMemeSchema = z.object({
  userId: z.string(),
  editedPrompt: z.string().min(1, "Enter at least a character"),
  memeId: z.string(),
});

export const createMeme = async (
  userId: string,
  prompt: string,
  {
    style,
    contestId,
    taskId,
  }: {
    style: Nullable<StylePreset>;
    contestId?: string;
    taskId?: string;
  }
) => {
  const validatedFields = schema.safeParse({ prompt, userId });

  if (!validatedFields.success) {
    throw new Error(
      JSON.stringify(validatedFields.error.flatten().fieldErrors)
    );
  }

  if (!isEnglishAlphabet(prompt)) {
    throw new Error("Only English alphabets are allowed");
  }

  const generatedImage = await generateMeme(prompt, userId, {
    style,
    contestId,
  });

  if (!generatedImage) {
    throw new Error("Something went wrong trying to create your meme.");
  }

  const { meme, content, img } = generatedImage;

  const folderPath = path.join(process.cwd(), "public", "memes", userId);
  const filePath = path.join(folderPath, "temp.png");
  const memePath = path.join(folderPath, "meme.png");

  try {
    if (!existsSync(folderPath)) {
      await fs.mkdir(folderPath, { recursive: true });
    }

    // if (existsSync(filePath)) {
    //   await fs.unlink(filePath);
    // }

    // if (existsSync(memePath)) {
    //   await fs.unlink(memePath);
    // }

    await fs.writeFile(filePath, img as unknown as string);
    await fs.writeFile(memePath, meme!);
  } catch (err) {
    console.error("Error occurred while saving the image", err);
  }

  return [
    {
      prompt,
      caption: content,
      url: `/memes/${userId}/meme.png?${nanoid()}`,
      id: nanoid(),
    },
  ];
};

export async function editMeme(
  userId: string,
  editedPrompt: string,
  memeId: string
) {
  const validatedFields = editMemeSchema.safeParse({
    userId,
    editedPrompt,
    memeId,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // const image = path.join(
  //   process.cwd(),
  //   `public`,
  //   `memes`,
  //   `${userId}`,
  //   `temp.png`
  // );
  // const img = await fs.readFile(image);
  // const combinedBuffer = await combineImageAndText(img, editedPrompt);
}

export async function addFavourite(memeId: string, createdById: string) {
  await prisma.user.update({
    where: {
      id: String(createdById),
    },
    data: {
      favorites: {
        connect: {
          id: String(memeId),
        },
      },
    },
  });
}

export async function AddUnFavourite(memeId: string, createdById: string) {
  await prisma.user.update({
    where: {
      id: String(createdById),
    },
    data: {
      favorites: {
        disconnect: {
          id: String(memeId),
        },
      },
    },
  });
}
