"use client";

import { Box } from "@/components/Box";
import GlobalLoader from "@/packages/mini-app/components/global-locker/GlobalLoader";
import { getTgUser } from "@/utils";
import { Prisma } from "@prisma/client";
import classnames from "classnames/bind";
import { nanoid } from "nanoid";
import { useSearchParams } from "next/navigation";
import { FC } from "react";
import { follow, like, unFollow, unLike } from "../../../lib/actions";
import InfiniteQuery from "./InfiniteQuery";
import { MemeItem } from "./MemeItem";
import styles from "./MemeList.module.scss";

type Meme = Prisma.MemeGetPayload<{
  include: {
    createdBy: { include: { followers: true } };
    likes: true;
  };
}>;

const cn = classnames.bind(styles);

const MemeList: FC = () => {
  const tgUser = getTgUser();
  const searchParams = useSearchParams();

  const tgUserId = tgUser?.user?.id?.toString() as string;

  const memes = (
    <InfiniteQuery
      requestUrl="/api/memes"
      Loader={<GlobalLoader />}
      params={{ filter: searchParams?.get("filter") ?? "" }}
      renderChildren={(data: any, { mutate }) => {
        const onLike = async (id: string) => {
          const optimisticData = data?.map((meme: Meme) => {
            if (meme.id != id) return meme;

            return {
              ...meme,
              likes: [
                ...meme.likes,
                { id: nanoid(), userId: tgUserId, memeId: id },
              ],
            };
          });

          await mutate(optimisticData, {
            optimisticData: optimisticData,
            rollbackOnError: true,
            populateCache: true,
            revalidate: false,
          });

          await like(id, tgUserId);
          mutate();
        };

        const onUnlike = async (likeId: string, memeId: string) => {
          const optimisticData = data?.map((meme: Meme) => {
            if (meme.id != memeId) return meme;

            return {
              ...meme,
              likes: meme.likes.filter((like) => like.id !== likeId),
            };
          });

          await mutate(optimisticData, {
            optimisticData: optimisticData,
            rollbackOnError: true,
            populateCache: true,
            revalidate: false,
          });

          await unLike(likeId);

          mutate();
        };

        const onFollow = async (userId: string) => {
          const optimisticData = data?.map((meme: Meme) => {
            return {
              ...meme,
              ...(meme.createdById?.toString() == userId && {
                createdBy: {
                  ...meme.createdBy,
                  followers: [...meme.createdBy.followers, { id: tgUserId }],
                },
              }),
            };
          });

          await mutate(optimisticData, {
            optimisticData: optimisticData,
            rollbackOnError: true,
            populateCache: true,
            revalidate: false,
          });

          await follow(userId, tgUserId);
          mutate();
        };

        const onUnFollow = async (userId: string) => {
          const optimisticData = data?.map((meme: Meme) => {
            return {
              ...meme,
              createdBy: {
                ...meme.createdBy,
                followers: meme.createdBy.followers.filter(
                  (follower) =>
                    String(follower.id) != tgUserId &&
                    meme.createdById?.toString() == userId
                ),
              },
            };
          });

          await mutate(optimisticData, {
            optimisticData: optimisticData,
            rollbackOnError: true,
            populateCache: true,
            revalidate: false,
          });

          await unFollow(userId, tgUserId!);
          mutate();
        };

        return (
          <div className={cn("meme_list")}>
            {data?.map((meme: Meme) => {
              const likeId = meme.likes?.find(
                (l) => String(l.userId) == tgUserId
              )?.id;

              return (
                <div key={meme.id?.toString()}>
                  <MemeItem
                    id={meme.id?.toString()}
                    url={meme.url}
                    caption={meme.caption || ""}
                    userId={meme.createdById?.toString()}
                    creator={meme.createdBy}
                    likeId={likeId}
                    onLike={onLike}
                    onUnLike={onUnlike}
                    onFollow={onFollow}
                    onUnFollow={onUnFollow}
                    createdAt={meme.createdAt?.toString() || ""}
                  />
                </div>
              );
            })}
          </div>
        );
      }}
    />
  );

  return <Box>{memes}</Box>;
};

export { MemeList };
