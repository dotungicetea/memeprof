import { Prisma } from "@prisma/client";
import useSWR from "swr";
import { fetcher } from "./fetcher";

function useMeme(id: string) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `/api/memes?createdById=${id}` : undefined,
    fetcher
  );

  return {
    memes: data as Prisma.MemeGetPayload<{
      include: {
        likes: true;
        favorites: true;
      };
    }>[],
    isLoading,
    isError: error,
    mutate,
  };
}

export { useMeme };
