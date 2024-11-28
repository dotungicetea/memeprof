import { User } from "@prisma/client";

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

export type TopPointUsersProps = {
  TopPointUsers: (User & {
    totalPoints: number;
  })[];
};
