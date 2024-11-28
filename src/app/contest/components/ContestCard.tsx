import Avatar from "@/components/Avatar/Avatar";
import { Box } from "@/components/Box";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import RippleBase from "@/components/RippleBase";
import { Typography } from "@/components/Typography";
import { getTgUser } from "@/utils";
import { Contest } from "@prisma/client";
import classNames from "classnames/bind";
import { formatDuration, intervalToDuration } from "date-fns";
import Link from "next/link";
import styles from "./contest-card.module.scss";

const cn = classNames.bind(styles);

type Props = {
  shouldRenderFooter?: boolean;
} & Contest;

const ContestCard = ({
  id,
  title,
  avatarUrl,
  contentTitle,
  description,
  imageUrl,
  rewardTitle,
  endDate,
  shortDescription,
  rewardAvatarUrl,
  shouldRenderFooter = true,
}: Props) => {
  const tgUser = getTgUser();

  return (
    <Link
      className={cn("contest-item")}
      href={`/contest/${id}?userId=${tgUser?.user?.id}`}
    >
      <RippleBase>
        {/* <Box
          className={cn("contest-item__header")}
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        ></Box> */}
        <Box className={cn("contest-item__content")}>
          <Box className={cn("contest-item__name")}>
            <Box className="flex flex-col">
              <Typography variant="h4" className={cn("contest-item__title")}>
                {title}
              </Typography>
              <Typography
                variant="h4"
                className={cn("flex")}
                style={{
                  color: "yellow",
                  fontSize: "0.8rem",
                }}
              >
                <Icon icon="coin" className="mr-2" size="xs" />
                {rewardTitle}
              </Typography>
            </Box>

            <Avatar
              className={cn("contest-item__avatar")}
              url={avatarUrl}
              name={title}
            />
          </Box>
          {shouldRenderFooter ? (
            <>
              <Box>
                <Typography
                  variant="caption"
                  className={cn("contest-item__description")}
                >
                  {shortDescription}
                </Typography>
              </Box>
              <Card className={cn("contest-item__footer")}>
                {/* <Avatar url={rewardAvatarUrl} name={rewardTitle} /> */}
                {/* <Box className={cn("contest-item__footer__participants")}>
                  <Icon icon="participants" />
                  <Typography
                    variant="button"
                    className={cn("contest-item__footer__text")}
                  >
                    234
                  </Typography>
                </Box> */}

                <Box className={cn("contest-item__timer")}>
                  <Icon icon="timer" />{" "}
                  {formatDuration(
                    intervalToDuration({
                      start: new Date(),
                      end: new Date(endDate),
                    }),
                    {
                      format: ["days", "hours"],
                      delimiter: ", ",
                      zero: false,
                    }
                  )}{" "}
                  {"left"}
                </Box>
              </Card>
            </>
          ) : null}
        </Box>
      </RippleBase>
    </Link>
  );
};

export default ContestCard;
