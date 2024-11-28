type Point = {
  id: string;
  userId: string;
  amount: number;
  pointReason: string;
  createdAt: Date;
  updatedAt: Date;
};

type ReferredUsers = {
  id: string;
  firstName: string;
  lastName?: string | null | undefined;
  userName?: string | null | undefined;
  level: string;
  referralStatus: string;
  role: string;
  status: string;
  languageCode: string | null;
  createdAt: Date;
  updatedAt: Date;
  point: Point[];
};

type User = {
  id: string;
  firstName: string;
  lastName?: string | null | undefined;
  userName?: string | null | undefined;
  level: string;
  referralStatus: string;
  role: string;
  status: string;
  languageCode: string | null;
  createdAt: Date;
  updatedAt: Date;
  point: Point[];
  referredUsers: ReferredUsers[];
};

export type TopPointUsersProps = {
  TopPointUsers: User[];
};

export const medals = [
  "🥇",
  "🥈",
  "🥉",
  "🏅",
  "🏅",
  "🏅",
  "🏅",
  "🏅",
  "🏅",
  "🏅",
];

export type FetchMemesProps = {
  apiHost: string | undefined;
  stabilityKey: string | undefined;
  content: string | null;
};

export const apiConfig = {
  // chatgpt_version: "gpt-4",
  chatgpt_version: "gpt-3.5-turbo",
};
