"use client";

import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import { Typography } from "@/components/Typography";
import { getTgUser } from "@/utils";
import { useRouter } from "next/navigation";
import styles from "./Meme.module.scss";
import classNames from "classnames/bind";
import { Prisma } from "@prisma/client";
import { Avatar } from "@radix-ui/themes";
import { useEffect } from "react";
import { getTelegram } from "@/utils";

type MemeHeaderProps = {
  firstName?: string;
  lastName?: string | null;
  userId?: string;
  creator?:
    | Prisma.MemeGetPayload<{
        include: {
          createdBy: { select: { followers: { select: { id: true } } } };
        };
      }>["createdBy"];
};

const cn = classNames.bind(styles);

const MemeHeader = ({
  firstName,
  lastName,
  userId,
  creator,
}: MemeHeaderProps) => {
  const tgUser = getTgUser();

  const router = useRouter();

  const isOneSelf = userId == tgUser?.user?.id?.toString();
  const isFollowing = creator?.followers?.length;

  const handleFollow = async () => {
    if (isOneSelf) {
      return router.push("/profile");
    }
  };

  const telegram = getTelegram();
  useEffect(() => {
    if (telegram && telegram.themeParams?.secondary_bg_color) {
      telegram.setHeaderColor(telegram.themeParams.secondary_bg_color);
    }
  }, [telegram]);

  return (
    <>
      <BackButton isBackable={true} onClick={() => router.back()} />
      <div
        className={cn("header")}
        onClick={() => router.push(`/profile?id=${tgUser?.user?.id}`)}
      >
        <div className={cn("header__user")}>
          <Avatar
            variant="solid"
            color="violet"
            className={cn("header__user--avatar")}
            fallback={`${firstName?.charAt(0) ?? ""}${
              lastName?.charAt(0) ?? ""
            }`}
          />
          <Typography variant="h4" className={cn("header__user--title")}>
            {firstName} {lastName}
          </Typography>
        </div>
        <div className={cn("header__follow")}>
          <Button onClick={handleFollow}>
            {isOneSelf ? "View" : isFollowing ? "Unfollow" : "Follow"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default MemeHeader;
