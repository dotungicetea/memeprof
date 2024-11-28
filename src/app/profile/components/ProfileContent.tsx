"use client";

import { tabs } from "@/app/constants";
import { Box } from "@/components/Box";
import Empty from "@/components/Empty";
import GlobalLoader from "@/packages/mini-app/components/global-locker/GlobalLoader";
import { getTgUser } from "@/utils";
import { Meme } from "@prisma/client";
import * as Tabs from "@radix-ui/react-tabs";
import classnames from "classnames/bind";
import { useState } from "react";
import useSWR from "swr";
import ProfileCard from "./ProfileCard";
import styles from "./ProfileContent.module.scss";

const cn = classnames.bind(styles);

const ProfileContent = ({ userId }: { userId?: string }) => {
  const [filter, setFilter] = useState("all");

  const tgUser = getTgUser();

  const { data: memes, isLoading } = useSWR(
    [`/api/memes`, userId, filter],
    async (url) => {
      const res = await fetch(
        `/api/memes?createdById=${userId}&filter=${filter}`
      );
      const data = await res.json();
      return data;
    }
  );

  const isOneSelf = userId == tgUser?.user?.id?.toString();

  if (isLoading) return <GlobalLoader />;

  return (
    <Box className={cn("content")}>
      <Tabs.Root
        value={filter}
        defaultValue="all"
        onValueChange={(val) => setFilter(val)}
      >
        {isOneSelf ? (
          <Tabs.List className="content__tablist">
            {tabs?.map((tab) => (
              <Tabs.Trigger
                className={cn("content__tablist--tab")}
                key={tab.id}
                value={tab.id}
              >
                {tab.name}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        ) : null}
        {tabs?.map((tab) => (
          <Tabs.Content key={tab.id + "a"} value={tab.id}>
            {memes?.length === 0 ? (
              <Empty />
            ) : (
              <Box className={cn("content__list")}>
                {memes?.map((meme: Meme) => {
                  return (
                    <ProfileCard
                      key={meme.id}
                      id={meme.id}
                      url={meme.url}
                      caption={meme.caption}
                    />
                  );
                })}
              </Box>
            )}
          </Tabs.Content>
        ))}
      </Tabs.Root>
      {/* <MainButton text="backToMenu" onClick={() => router.push("/")} /> */}
    </Box>
  );
};

export default ProfileContent;
