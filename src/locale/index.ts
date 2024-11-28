import en from "./en";
import ru from "./ru";
import tr from "./tr";
import hi from "./hi";
import zh from "./zh";

export const messages = {
  en,
  ru,
  tr,
  hi,
  zh,
};

export type Locale = keyof typeof messages;
export type MessageIds = keyof typeof en;
