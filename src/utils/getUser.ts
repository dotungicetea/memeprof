import useSWR from "swr";
import { fetcher } from "./fetcher";

function useUser(id: string | number) {
  const { data, error, isLoading } = useSWR(`/api/users/${id}`, fetcher);

  return {
    users: data,
    isLoading,
    isError: error,
  };
}

export { useUser };
