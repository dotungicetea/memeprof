"use client";

import { Separator } from "@/packages/mini-app/components/separator/Separator";
import { getTelegram } from "@/utils";
import classnames from "classnames/bind";
import Link from "next/link";
import { Box } from "../Box";
import Button from "../Button";
import Icon from "../Icon";
import IconButton from "../IconButton";
import RippleBase from "../RippleBase";
import { Typography } from "../Typography";
import styles from "./ShareBox.module.scss";

const emptyLine = `%0a`;

type Props = {
  id: string;
  isShareBoxOpen: boolean;
  onClose: () => void;
  caption: string;
  showMemefeed?: boolean;
  onShareOnMemeFeed?: () => void;
};

const cn = classnames.bind(styles);

const ShareBox = ({
  id,
  caption,
  onClose,
  isShareBoxOpen,
  onShareOnMemeFeed,
  showMemefeed = false,
}: Props) => {
  if (!isShareBoxOpen) return null;

  const telegram = getTelegram();

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
    const inviteMsg = `https://app.memeprof.com/memes/${id}`;

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
        telegram?.showAlert("Copied to clipboard");
      } catch (error: any) {
        telegram?.showAlert("Error copying to clipboard");
        console.log(error);
      }
    } else {
      await navigator.clipboard
        .writeText(inviteMsg)
        .then(() => {
          console.log("successfully copied");
          telegram?.showAlert("Copied to clipboard");
        })
        .catch(() => {
          telegram?.showAlert("Error copying to clipboard");
        });
    }
  }

  return (
    <Box className={cn("share")}>
      <div className={cn("share__header")}>
        <Typography variant="h4">Share</Typography>
        <IconButton
          icon="close"
          onClick={onClose}
          className={cn("share__close-icon")}
        />
      </div>
      <div className={cn("share__list")}>
        {showMemefeed ? (
          <RippleBase onClick={onShareOnMemeFeed} className={cn("share__item")}>
            <button className={cn("share__btn")}>
              <Icon icon="logo" className={cn("share__icon")} />
            </button>
            <Typography variant="subtitle2" className={cn("share__link__text")}>
              Feed
            </Typography>
          </RippleBase>
        ) : null}
        <RippleBase className={cn("share__item")}>
          <Link
            className={cn("share__link")}
            href={
              new URL(
                `https://twitter.com/intent/post?text=${caption} ${emptyLine}https://app.memeprof.com/memes/${id} ${emptyLine}${emptyLine}this meme is generated via memeprof telegram bot${emptyLine}&hashtags=meme,memeprof`
              )
            }
            target="_blank"
          >
            <Icon icon="twitter" className={cn("share__icon")} />
            <Typography variant="subtitle2" className={cn("share__link__text")}>
              X
            </Typography>
          </Link>
        </RippleBase>
        <RippleBase className={cn("share__item")}>
          <Link
            className={cn("share__link")}
            href={
              new URL(
                `https://t.me/share/url?url=https://app.memeprof.com/memes/${id}&text=${caption} ${emptyLine}${emptyLine}*This meme is generated via memeprof telegram bot* https://t.me/memeprofbot`
              )
            }
            target="_blank"
          >
            <Icon icon="telegram" className={cn("share__icon")} />
            <Typography variant="subtitle2" className={cn("share__link__text")}>
              Telegram
            </Typography>
          </Link>
        </RippleBase>
      </div>

      <Separator className="my-2" />

      <Box className={cn("share__footer")}>
        <Button
          onClick={() => {
            copyToClipboard();
          }}
          variant="outlined"
        >
          Copy Link
        </Button>
      </Box>
    </Box>
  );
};

export default ShareBox;
