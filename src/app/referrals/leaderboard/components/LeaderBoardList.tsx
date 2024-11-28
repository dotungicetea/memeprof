"use client";

import { Box } from "@/components/Box";
import { FC } from "react";
import { TopPointUsersProps } from "@/types/userType";
import { levelMatcher } from "@/app/constants";
import Avatar from "@/components/Avatar/Avatar";
import Icon from "@/components/Icon";
import { Typography } from "@/components/Typography";

import classnames from "classnames/bind";
import styles from "./LeaderBoardList.module.scss";
const cn = classnames.bind(styles);

const LeaderBoardList: FC<TopPointUsersProps> = ({ TopPointUsers }) => {
  return (
    <Box className={cn("list")}>
      {TopPointUsers.map((item, index) => (
        <Box key={index} className={cn("list__item")}>
          <div className={cn("list__item-avatar")}>
            <Typography variant="caption" className={cn("list__item-rank")}>
              {index + 1 === 1 ? (
                <Icon
                  className={cn("list__item-rank-icon")}
                  icon="first"
                  size="sm"
                />
              ) : index + 1 === 2 ? (
                <Icon
                  className={cn("list__item-rank-icon")}
                  icon="second"
                  size="sm"
                />
              ) : index + 1 === 3 ? (
                <Icon
                  className={cn("list__item-rank-icon")}
                  icon="third"
                  size="sm"
                />
              ) : (
                <span>{index + 1}</span>
              )}
            </Typography>
            <Avatar name={item.firstName} />
          </div>
          <div className={cn("list__item-box")}>
            <Typography variant="h4" className={cn("list__item-name")}>
              {item.firstName}
            </Typography>
            <Typography variant="caption" className={cn("list__item-frens")}>
              {levelMatcher(item.totalPoints) || item.level}
            </Typography>
          </div>
          <Typography variant="caption" className={cn("list__item-points")}>
            <Icon
              className={cn("list__item-points-icon")}
              icon="coin"
              size="sm"
            />
            <span>{item.totalPoints}</span>
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default LeaderBoardList;
