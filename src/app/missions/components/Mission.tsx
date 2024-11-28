"use client";

import { Box } from "@/components/Box";
import MissionContent from "./MissionContent";
import MissionInviteFriends from "./MissionInviteFriends";

import { Divider } from "@/components/Divider";
import GlobalLoader from "@/packages/mini-app/components/global-locker/GlobalLoader";
import { GetSingleUser } from "@/utils/getSingleUser";
import classNames from "classnames/bind";
import styles from "./Mission.module.scss";
const cn = classNames.bind(styles);

const Mission = () => {
  const { user, mutate: refetch, isLoading } = GetSingleUser();

  if (isLoading || !user) {
    return <GlobalLoader />;
  }

  return (
    <Box className={cn("mission")}>
      <div className="mission__daily">
        <MissionContent user={user} refetch={refetch} />
        <Divider noLine />
        <MissionInviteFriends user={user} refetch={refetch} />
        {/* <MissinItem  */}
      </div>
    </Box>
  );
};

export default Mission;
