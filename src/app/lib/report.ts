"use server";
import { Api } from "grammy";

const api = new Api(process.env.BOT_TOKEN!);
export const report = async (issue: any) => {
  await api.sendMessage("1839588386", JSON.stringify(issue).substring(0, 3000));

  return "success";
};
