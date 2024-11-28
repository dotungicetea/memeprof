"use client";

import { follow, unFollow } from "@/app/lib/actions";
import Avatar from "@/components/Avatar/Avatar";
import BackButton from "@/components/BackButton";
import { Box } from "@/components/Box";
import Icon from "@/components/Icon";
import Skeleton from "@/components/Skeleton";
import { Typography } from "@/components/Typography";
import { getTelegram } from "@/utils";
import { GetSingleUser } from "@/utils/getSingleUser";
import { getTgUser } from "@/utils/getters";
import classnames from "classnames/bind";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import styles from "./ProfileHeader.module.scss";

const cn = classnames.bind(styles);

const ProfileHeader = ({ userId }: { userId?: string }) => {
  const Telegram = getTelegram();
  const tgUser = getTgUser();
  const router = useRouter();
  const intl = useIntl();

  useEffect(() => {
    if (Telegram && Telegram.themeParams?.secondary_bg_color) {
      Telegram.setHeaderColor(Telegram.themeParams.secondary_bg_color);
    }
  }, [Telegram]);

  const { user, mutate, isLoading } = GetSingleUser(userId);
  const isOneSelf = userId == tgUser?.user?.id?.toString?.();

  const isFollowing = user?.followers?.length!;
  // const handleFollow = async () => {
  //   if (isOneSelf) {
  //     Telegram?.HapticFeedback?.notificationOccurred("success");
  //     Telegram?.showAlert(`Coming soon! Stay tuned, ${user?.firstName}! 🎉`);
  //   } else {
  //     if (isFollowing) {
  //       setIsFollowing(false);
  //       await unFollow(userId!, tgUser?.user?.id?.toString()!);
  //     } else {
  //       setIsFollowing(true);
  //       await follow(userId!, tgUser?.user?.id?.toString()!);
  //     }

  //     mutate && mutate();
  //   }
  // };

  const handleFollow = async () => {
    if (isOneSelf) {
      Telegram?.showAlert(
        `${intl.formatMessage({ id: "comingSoonStayTuned" })} ${
          user?.firstName
        }! 🎉`
      );
    }

    if (isFollowing) {
      await unFollow(userId!.toString()!, tgUser?.user?.id?.toString()!);
      mutate();
    } else {
      await follow(userId!.toString()!, tgUser?.user?.id?.toString()!);
      mutate();
    }
  };

  if (isLoading) {
    return (
      <Box className={cn("profile")}>
        <BackButton isBackable onClick={router.back} />
        <Skeleton width="100%" height="250px" borderRadius="20px" />
      </Box>
    );
  }

  return (
    <Box className={cn("profile")}>
      <BackButton isBackable onClick={router.back} />
      <Box className={cn("card")}>
        <Avatar
          className={cn("card__avatar")}
          name={`${user?.firstName} ${user?.lastName}`}
          size="lg"
        />
        <Typography variant="h2" className={cn("card__name")}>
          {user?.firstName} {user?.lastName}
        </Typography>

        <Box className={cn("card__level")}>
          <span>🏆 {user?.level}</span> -
          <span className={cn("card__point")}>
            {user?.totalPoints}
            <Icon icon="coin" className={cn("card__icon")} size="sm" />
          </span>
        </Box>

        <Box className={cn("box")}>
          <div className={cn("box__item")}>
            <Typography variant="h4">{user?.following?.length}</Typography>
            <Typography variant="caption" className={cn("box__text")}>
              Following
            </Typography>
          </div>
          <div className={cn("box__item")}>
            <Typography variant="h4">{user?.followers?.length}</Typography>
            <Typography variant="caption" className={cn("box__text")}>
              Followers
            </Typography>
          </div>
          <button
            className={cn("box__button")}
            onClick={handleFollow}
            disabled={isLoading}
          >
            {isOneSelf ? "Edit" : isFollowing ? "Unfollow" : "Follow"}
          </button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
