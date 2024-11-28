import { combineImageAndText } from "@/app/text-to-meme/lib/combineImageAndText";
import { constructSystemPrompt } from "@/app/text-to-meme/lib/constructSystemPrompt";
import { getPromptCompletion } from "@/app/text-to-meme/lib/openai";

const generateMeme = async (prompt: string, img: any) => {
  const systemPrompt = constructSystemPrompt(prompt);

  let content: string;

  try {
    content = await getPromptCompletion(systemPrompt);
  } catch (error) {
    console.error("Error occurred while creating chat completion:", error);

    throw new Error("Error occured while creating meme caption");
  }

  const meme = await combineImageAndText(img, content);

  return {
    meme,
    content,
  };
};

export { generateMeme };
