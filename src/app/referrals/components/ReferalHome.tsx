"use client";

import useBackButton from "@/components/BackButton/useBackButton";
import { Box } from "@/components/Box";
import Icon from "@/components/Icon";
import RippleBase from "@/components/RippleBase";
import { Typography } from "@/components/Typography";
import AnimatedNumbers from "@/external/AnimatedNumbers";
import { ActionButton } from "@/packages/mini-app/components/action-button/ActionButton";
import { getTelegram, getTgUser } from "@/utils/getters";
import classnames from "classnames/bind";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import BonuseList from "./BonuseList";
import styles from "./ReferalHome.module.scss";
import ReferredUsers from "./ReferredUsers";
import IconButton from "@/components/IconButton";

const cn = classnames.bind(styles);

function detectIOS() {
  const toMatch = [
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    // /BlackBerry/i,
    // /Windows Phone/i,
  ];

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
}

function detectAndroid() {
  const toMatch = [/Android/i];

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
}

async function copyToClipboard() {
  const tgUser = getTgUser();
  const telegram = getTelegram();

  const inviteMsg: string = `🎉 Join MemeProf and Start Earning Today! 🎉
            
🔗 Click here to get started: Join MemeProf
            
Don't miss out on the fun and rewards 
https://t.me/memeprofbot/start?startapp=rid${tgUser?.user?.id}`;

  if (detectIOS()) {
    try {
      await navigator.share({
        text: inviteMsg,
      });
    } catch (error: any) {
      console.log(error);
    }
  } else if (detectAndroid()) {
    try {
      await navigator.clipboard.writeText(inviteMsg);
      telegram?.showAlert("MemeProf referral link\n\nCopied to clipboard");
    } catch (error: any) {
      telegram?.showAlert("Error copying to clipboard");
      console.log(error);
    }
  } else {
    await navigator.clipboard
      .writeText(inviteMsg)
      .then(() => {
        console.log("successfully copied");
        telegram?.showAlert("MemeProf referral link\n\nCopied to clipboard");
      })
      .catch(() => {
        telegram?.showAlert("Error copying to clipboard");
      });
  }
}

const ReferalHome = () => {
  const router = useRouter();
  const tgUser = getTgUser();
  const telegram = getTelegram();

  useEffect(() => {
    if (telegram && telegram.themeParams?.secondary_bg_color) {
      telegram.setHeaderColor(telegram.themeParams.secondary_bg_color);
    }
  }, [telegram]);

  useBackButton({
    isBackable: true,
    onClick: router.back,
  });

  return (
    <Box className={cn("referral")}>
      <Typography className={cn("referral__title")} variant="h1">
        <FormattedMessage id="friendsZone" />
      </Typography>
      <RippleBase
        className={cn("referral__leaders")}
        onClick={() => {
          router.push("/referrals/leaderboard");
        }}
      >
        <span className={cn("referral__leaders-coins")}>
          +
          <AnimatedNumbers
            includeComma
            transitions={(index) => ({
              type: "spring",
              duration: index + 0.3,
            })}
            className={cn("container")}
            fontStyle={{
              fontSize: 14,
              color: "#efb832",
            }}
            animateToNumber={100}
          />
          <Icon
            className={cn("referral__leaders-coins-icon")}
            icon="coin"
            size="sm"
          />
        </span>
        <span className={cn("referral__leaders-text")}>
          <b>
            {" "}
            <FormattedMessage id="top" />{" "}
          </b>{" "}
          <FormattedMessage id="leaders" />
        </span>
        <Icon
          className={cn("referral__leaders-right")}
          icon="right"
          size="sm"
          color="text"
        />
      </RippleBase>

      <Typography className={cn("referral__heading")} variant="h2">
        <FormattedMessage id="inviteAndEarn" />
      </Typography>

      <BonuseList />

      <Typography className={cn("referral__heading")} variant="h2">
        <FormattedMessage id="friendsList" />
      </Typography>

      <ReferredUsers />

      <Box className="flex items-center gap-2">
        <ActionButton
          className={cn("referral__action")}
          onClick={() => {
            telegram?.openTelegramLink(
              `https://t.me/share/url?text=🎉 Join MemeProf and Start Earning Today! 🎉
            
            🔗 Click here to get started: Join MemeProf
            
            Don't miss out on the fun and rewards!&url=https://t.me/memeprofbot/start?startapp=rid${tgUser?.user?.id}`
            );
          }}
        >
          <FormattedMessage id="inviteFrens" />
        </ActionButton>
        <IconButton
          iconClassName="!fill-primary"
          className="!bg-bg_dark_primary"
          color="primary"
          icon="copy"
          onClick={() => {
            copyToClipboard();
          }}
        />
      </Box>
    </Box>
  );
};

export default ReferalHome;
