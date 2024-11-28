import { openaiKey } from "@/app/text-to-meme/lib/openAiKey";
import { apiConfig } from "@/utils/constant";

export const getPromptCompletion = async (prompt: string): Promise<string> => {
  const promptCompletion = await openaiKey.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: apiConfig.chatgpt_version,
  });

  return promptCompletion.choices[0].message.content as string;
};
