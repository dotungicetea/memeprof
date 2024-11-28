import { MessageIds } from "@/locale";
import { Level } from "@prisma/client";

export const currency = "Br";
export const currencySign = "Br";
export const DEFAULT_TAX_PERCENTAGE = 15;

export const PROF_LEVEL_GUIDE =
  "https://medium.com/@memeprof/prof-the-meme-odyssey-your-journey-from-grifter-to-professor-on-memeprof-ee5e668fcc1f";

export const HOW_TO_EARN_POINTS =
  "https://medium.com/@memeprof/memeprof-points-quest-a-journey-of-creativity-and-connection-bda886d7dc2d";

export const MEME_PAPER_LINK =
  "https://drive.google.com/file/d/1CJI_3gRF5tTAUbKklLa7qHkwMSjPv04D/view?usp=sharing";

export const levels = [
  {
    id: 1,
    title: "🏆 The Professor",
    value: 5000000,
  },
  {
    id: 2,
    title: "🏆 Maestro",
    value: 2000000,
  },
  {
    id: 3,
    title: "🏆 Safecracker",
    value: 1000000,
  },
  {
    id: 4,
    title: "🏆 Infiltrator",
    value: 500000,
  },
  {
    id: 5,
    title: "🏆 Phantom",
    value: 200000,
  },
  {
    id: 6,
    title: "🏆 Cryptologist",
    value: 100000,
  },
  {
    id: 7,
    title: "🏆 Hacker",
    value: 75000,
  },
  {
    id: 8,
    title: "🏆 Wheelman",
    value: 50000,
  },
  {
    id: 9,
    title: "🏆 Plotter",
    value: 10000,
  },
  {
    id: 10,
    title: "🏆 Grifter",
    value: 1000,
  },
];

export const levelsMap = levels.reduce((acc, level) => {
  acc[level.value] = level.title;

  return acc;
}, {} as Record<number, string>);

export const levelMatcher = (points: number) => {
  const level = levels.find((l) => points >= l.value);

  return level?.title ?? Level.NOOB;
};

export const tabs = [
  {
    id: "all",
    name: "All",
  },
  {
    id: "publ",
    name: "Published",
  },
  {
    id: "unpubl",
    name: "Unpublished",
  },
];

export const MainMenuContent: {
  id: string;
  title: MessageIds;
  href: string;
  icon: string;
}[] = [
  {
    id: "memefeed",
    title: "memefeed",
    href: "/memes",
    icon: "/images/memes.png",
  },
  {
    id: "referrals",
    title: "referrals",
    href: "/referrals",
    icon: "/images/referrals.png",
  },
  {
    id: "memequest",
    title: "meme_quest",
    href: "/contest",
    icon: "/images/contest.png",
  },
  {
    id: "games",
    title: "games",
    href: "/games",
    icon: "/images/games.png",
  },
  {
    id: "trending",
    title: "prof_trends",
    href: "/trending",
    icon: "/images/trending.png",
  },
  {
    id: "mission",
    title: "profMissions",
    href: "/missions",
    icon: "/images/missions.png",
  },
  {
    id: "airdrop",
    title: "airdrop",
    href: "/airdrop",
    icon: "/images/airdrop10.png",
  },
];

export const languageOptions = [
  {
    label: "English",
    value: "en" as const,
    id: "english",
    subLabel: "English",
  },
  {
    label: "Russian",
    value: "ru" as const,
    id: "russian",
    subLabel: "русский",
  },
  {
    label: "Hindi",
    value: "hi" as const,
    id: "hindi",
    subLabel: "हिन्दी",
  },
  {
    label: "Turkish",
    value: "tr" as const,
    id: "turkish",
    subLabel: "Türkçe",
  },
  {
    label: "Mandarin",
    value: "zh" as const,
    id: "chinese",
    subLabel: "中文",
  },
];

export const SUPPORT_BOT_LINK = `https://t.me/${process.env.NEXT_PUBLIC_SUPPORT_BOT}`;
export const PROFAPP_CHANNLE_LINK = `https://t.me/${process.env.NEXT_PUBLIC_CHANNEL_LINK}`;

export const palette = {
  dark: {
    primary: "#47990C",
    secondary: "#A1DF24",
  },
  light: {
    primary: "#47990C",
    secondary: "#A1DF24",
  },
};
