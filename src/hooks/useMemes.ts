"use client";

import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { Meme } from "@prisma/client";

const useMemes = () => {
  const url = `/api/memes`;
  const { data, error } = useSWR<Meme, Error>(url, fetcher);

  return {
    data,
    error,
  };
};

export { useMemes };
