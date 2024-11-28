import { levelsMap } from "@/app/constants";
import { Level } from "@prisma/client";

export const hasLevelChanged = (oldLevel: Level, points: number) => {
  const curLevel = levelsMap[points];

  return oldLevel !== curLevel;
};

export const getLevel = (points: number) => {
  return levelsMap[points];
};
