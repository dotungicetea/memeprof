import { OpenAI } from "openai";

const openaiKey = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export { openaiKey };
