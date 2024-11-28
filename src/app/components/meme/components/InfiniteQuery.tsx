"use client";

import Empty from "@/components/Empty";
import { FC, useEffect, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { KeyedMutator } from "swr";
import useSWRInfinite from "swr/infinite";
import { Box } from "../../../../components/Box";
import TripleDotLoader from "../../../../components/TripleDotLoader";
import { Typography } from "../../../../components/Typography";
import { getTgUser, noop } from "../../../../utils";

export type InfiniteQueryProps = {
  requestUrl: string;
  renderChildren: <T>(
    data: T,
    options: { mutate: KeyedMutator<any[]> }
  ) => JSX.Element;
  Loader?: JSX.Element;
  params?: { [key: string]: string | number };

  onSuccess?: <T>(data: T) => void;
};

const InfiniteQuery: FC<InfiniteQueryProps> = ({
  params: searchParams,
  requestUrl,
  renderChildren,
  onSuccess = noop,
  Loader: CustomLoader = <TripleDotLoader />,
}) => {
  const tgUser = getTgUser();
  const sp = useMemo(
    () => new URLSearchParams((searchParams as any) ?? {}),
    [searchParams]
  );

  const { data, mutate, size, setSize, isValidating, isLoading, error } =
    useSWRInfinite(
      (index) => `${requestUrl}?page=${index + 1}`,
      async (args) => {
        const [url, query] = args.split("?");
        const params = new URLSearchParams(query);
        const page = params.get("page");

        const fullUrl = `${url}?page=${
          page || 1
        }&userId=${tgUser?.user?.id?.toString()}${
          sp ? `&${sp.toString()}` : ""
        }`;

        const res = await fetch(fullUrl, { cache: "no-store" });
        const json = await res.json();

        return json;
      },
      {
        onError: noop,
        onSuccess,
        keepPreviousData: false,
        revalidateOnFocus: false,
      }
    );

  useEffect(() => {
    if (searchParams) {
      mutate();
    }
  }, [mutate, searchParams, sp]);

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");

  const isReachingEnd = data && data.length && !data[size - 1]?.length;
  const isRefreshing = isValidating && data && data.length === size;

  const fetchNextPage = async () => {
    await setSize((size) => size + 1);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "calc(100vh - 65px)",
          textAlign: "center",
          marginTop: "1rem",
        }}
      >
        {CustomLoader}
      </Box>
    );
  }

  if (error) {
    return (
      <Typography>Somethign went wrong. Please try again later.</Typography>
    );
  }

  const infiniteData = data?.flat();

  if (infiniteData?.length === 0) {
    return (
      <Empty
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 65px)",
        }}
      />
    );
  }

  return (
    <InfiniteScroll
      dataLength={infiniteData?.length!}
      next={fetchNextPage}
      hasMore={!isReachingEnd}
      loader={
        <Box
          sx={{
            margin: "1rem auto",
            textAlign: "center",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TripleDotLoader />
        </Box>
      }
      refreshFunction={mutate}
    >
      {renderChildren(infiniteData, { mutate })}
    </InfiniteScroll>
  );
};

export default InfiniteQuery;
