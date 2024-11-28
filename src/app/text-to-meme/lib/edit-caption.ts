"use server";

import { existsSync } from "fs";
import path from "path";
import { combineImageAndText } from "./combineImageAndText";
import { promises as fs } from "fs";

export const moveCaption = async (
  memeId: string,
  direction: "up" | "down",
  userId: string,
  caption: string
) => {
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

  const img = await fs.readFile(filePath);

  const meme = await combineImageAndText(img, caption, direction);

  if (!meme) {
    throw new Error("Error occurred while combining the image and text");
  }

  try {
    await fs.writeFile(memePath, meme);
  } catch (err) {
    console.error("Error occurred while saving the image", err);
  }

  return {
    id: memeId,
    content: caption,
    memePath,
  };
};
