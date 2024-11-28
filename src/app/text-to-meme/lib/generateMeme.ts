import { combineImageAndText } from "@/app/text-to-meme/lib/combineImageAndText";
import { constructSystemPrompt } from "@/app/text-to-meme/lib/constructSystemPrompt";
import { fetchMemes } from "@/app/text-to-meme/lib/fetchMemes";
import { getPromptCompletion } from "@/app/text-to-meme/lib/openai";
import { ContestMemeConfiguration } from "@prisma/client";
import { StylePreset } from "../components/constants";
import { prisma } from "@/utils/prisma";

const generateMeme = async (
  prompt: string,
  userId: string,
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
  const apiHost = process.env.API_HOST;
  const stabilityKey = process.env.STABILITY_API_KEY;
  const systemPrompt = constructSystemPrompt(prompt);

  let content: string;
  let memeConfiguration: Nullable<ContestMemeConfiguration>;

  if (contestId) {
    memeConfiguration = await prisma?.contestMemeConfiguration.findUnique({
      where: {
        contestId,
      },
    });
  }

  console.log("Generating meme for user:", userId, prompt);

  try {
    if (memeConfiguration?.prompt) {
      content = await getPromptCompletion(
        memeConfiguration?.prompt + " " + systemPrompt
      );
    } else {
      content = await getPromptCompletion(systemPrompt);
    }
  } catch (error) {
    console.error("Error occurred while creating chat completion:", error);

    throw new Error("Error occured while creating meme caption");
  }

  const response = await fetchMemes({
    apiHost,
    content,
    stabilityKey,
    style,
  });

  const imageResult = response.data;

  if (!imageResult) {
    throw new Error("Error occurred while creating meme");
  }

  const meme = await combineImageAndText(
    imageResult,
    content,
    "down",
    memeConfiguration?.watermarkUrl!
  );

  return {
    img: imageResult,
    meme,
    content,
  };
};

export { generateMeme };
