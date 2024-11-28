"use client";

import { Box } from "@/components/Box";
import { Typography } from "@/components/Typography";
import { Contest } from "@prisma/client";
import classNames from "classnames/bind";
import { useRouter } from "next/navigation";
import ContestCard from "./ContestCard";
import styles from "./contests.module.scss";

import useBackButton from "@/components/BackButton/useBackButton";
import Empty from "@/components/Empty";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/packages/mini-app/components/tabs/Tabs";
import { useState } from "react";

const cn = classNames.bind(styles);

type Props = {
  contests: Contest[];
};

const filterContests = (contests: Contest[], activeTab: string) => {
  if (activeTab === "active")
    return contests.filter((contest) => contest.isActive);
  if (activeTab === "upcoming")
    return contests.filter((contest) => !contest.isEnded && !contest.isActive);
  if (activeTab === "finished")
    return contests.filter((contest) => contest.isEnded);

  return contests;
};

const Contests = ({ contests }: Props) => {
  const [activeTab, setActiveTab] = useState("active");

  const router = useRouter();

  const filteredContests = filterContests(contests, activeTab);

  useBackButton({
    isBackable: true,
    onClick: router.back,
  });

  return (
    <>
      <Box className={cn("contest")}>
        <Box className={cn("contest__header")}>
          <Typography variant="h2" className={cn("contest__title")}>
            Quests
          </Typography>
        </Box>

        <Tabs
          defaultValue="active"
          className="w-full"
          onValueChange={(val) => setActiveTab(val)}
        >
          <TabsList className="grid w-full grid-cols-2 border-gray-100/15 border !p-0">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="finished">Finished</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="py-2 flex flex-col gap-4">
            {!filteredContests?.length ? (
              <div className="mt-10">
                <Empty />
              </div>
            ) : (
              filteredContests?.map((contest) => (
                <ContestCard key={contest.id} {...contest} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </Box>
    </>
  );
};

export default Contests;
