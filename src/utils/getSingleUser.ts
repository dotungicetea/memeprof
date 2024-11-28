"use client";

import { Prisma } from "@prisma/client";
import useSWR from "swr";
import { fetcher } from "./fetcher";
import { getTgUser } from "./getters";

export type User = Prisma.UserGetPayload<{
  include: {
    point: true;
    followers: true;
    following: true;
    referredUsers: true;
  };
}> & {
  totalPoints: number;
  nextClaimDate: Date;
};

function GetSingleUser(id?: string) {
  const tgUser = getTgUser();

  const tgId = tgUser?.user?.id ?? id;

  const { data, error, isLoading, mutate } = useSWR<User>(
    tgId ? `/api/user/${tgId}` : undefined,
    fetcher
  );

  return {
    user: data,
    isLoading,
    isError: error,
    mutate,
  };
}

export { GetSingleUser };
