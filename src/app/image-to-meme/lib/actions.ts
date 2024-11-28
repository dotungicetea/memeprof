"use server";

import { isEnglishAlphabet } from "@/app/text-to-meme/lib/IsEnglishAlphabet";
import { existsSync } from "fs";
import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";
import { generateMeme } from "./createMemeFromImage";

export const createMeme = async (userId: string, prompt: string) => {
  if (!isEnglishAlphabet(prompt)) {
    throw new Error("Only English alphabets are allowed");
  }
  const folderPath = path.join(process.cwd(), "public", "memes", userId);
  const filePath = path.join(folderPath, "temp.png");
  const memePath = path.join(folderPath, "meme.png");

  const file = await fs.readFile(filePath);

  const generatedImage = await generateMeme(prompt, file);
  if (!generatedImage) {
    throw new Error("Something went wrong trying to create your meme.");
  }

  const { meme, content } = generatedImage;

  try {
    if (!existsSync(folderPath)) {
      await fs.mkdir(folderPath, { recursive: true });
    }

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
