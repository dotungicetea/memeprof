"use client";

import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { Box } from "@/components/Box";
import { getTgUser } from "@/utils";
import classnames from "classnames/bind";
import styles from "./Profile.module.scss";

const cn = classnames.bind(styles);

const Profile = ({ userId }: { userId?: string }) => {
  const tgUser = getTgUser();
  const id = userId || tgUser?.user?.id?.toString();

  return (
    <Box className={cn("account")}>
      <ProfileHeader userId={id} />
      <ProfileContent userId={id} />
    </Box>
  );
};

export default Profile;
