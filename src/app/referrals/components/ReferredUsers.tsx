"use client";

import Avatar from "@/components/Avatar/Avatar";
import Empty from "@/components/Empty";
import Icon from "@/components/Icon";
import Skeleton from "@/components/Skeleton";
import { Typography } from "@/components/Typography";
import { useUser } from "@/utils/getUser";
import { getTgUser } from "@/utils/getters";
import { Prisma } from "@prisma/client";
import classnames from "classnames/bind";
import styles from "./ReferredUsers.module.scss";

const cn = classnames.bind(styles);

const ReferredUsers = () => {
  const tgUser = getTgUser();

  const { users } = useUser(String(tgUser?.user?.id)) as {
    users: Prisma.UserGetPayload<{
      include: { point: true };
    }>[];
  };

  if (!users)
    return (
      <div className={cn("referral__list")}>
        <Skeleton width="100%" height="40px" borderRadius="10px" />
        <Skeleton width="100%" height="40px" borderRadius="10px" />
        <Skeleton width="100%" height="40px" borderRadius="10px" />
      </div>
    );

  return (
    <div className={cn("referral__list")}>
      {users?.length === 0 ? (
        <Empty />
      ) : (
        users?.map((user, index) => (
          <div key={index} className={cn("referral__list--item")}>
            <Avatar
              className={cn("referral__list--avatar")}
              name={user.firstName}
            />

            <Typography
              variant="caption"
              className={cn("referral__list--name")}
            >
              {user.firstName}
            </Typography>
            <Typography
              variant="caption"
              className={cn("referral__list--text")}
            >
              🏆 {user.level}
            </Typography>

            <Typography
              variant="caption"
              className={cn("referral__list--item--coin")}
            >
              <Icon
                icon="coin"
                className={cn("referral__list--item--coin--icon")}
                size="sm"
              />
              {user.point?.reduce((acc, p) => acc + p.amount, 0)}
            </Typography>
          </div>
        ))
      )}
    </div>
  );
};

export default ReferredUsers;
