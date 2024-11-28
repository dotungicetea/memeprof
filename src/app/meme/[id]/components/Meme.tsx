"use client";

import { like, unLike } from "@/app/lib/actions";
import {
  deleteMeme,
  publishMeme,
  unPublish,
} from "@/app/text-to-meme/lib/save-meme";
import { Box } from "@/components/Box";
import IconButton from "@/components/IconButton";
import List from "@/components/List/List";
import ListItem from "@/components/List/ListItem";
import ShareBox from "@/components/ShareBox/ShareBox";
import Popover from "@/packages/mini-app/components/popover/Popover";
import {
  selectSnackbarShow,
  useSnackbar,
} from "@/packages/mini-app/components/snackbar/useSnackbar";
import {
  selectToggleGlobalLocker,
  useGlobalTheme,
} from "@/packages/mini-app/store/useGlobalTheme";
import { getMainButton, getTelegram, getTgUser } from "@/utils";
import { Like } from "@prisma/client";
import classNames from "classnames/bind";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import styles from "./meme.module.scss";

const cn = classNames.bind(styles);

type Props = {
  url: string;
  likes: Like[];
  id: string;
  caption: string;
  isPublished: boolean;
  createdById: string;
};

const Meme: FC<Props> = ({
  url,
  likes,
  id,
  caption,
  isPublished,
  createdById,
}) => {
  const [shareViewVisible, setShareViewVisible] = useState(false);

  const tgUser = getTgUser();
  const router = useRouter();
  const telegram = getTelegram();
  const mainButton = getMainButton();

  const show = useSnackbar(selectSnackbarShow);
  const toggleLocker = useGlobalTheme(selectToggleGlobalLocker);

  const tgUserId = String(tgUser?.user?.id);

  const onLike = async (id: string) => {
    await like(id, tgUserId);
    router.refresh();
  };

  const onUnlike = async (likeId: string, memeId: string) => {
    await unLike(likeId);
    router.refresh();
  };

  const handleLike = async () => {
    if (!tgUserId) {
      return telegram?.showAlert(`Please login to like this meme!`);
    }

    const likeId = likes?.find((l) => String(l.userId) == tgUserId)?.id;
    if (likeId) {
      await onUnlike(likeId, id);
    } else {
      await onLike(id);
    }
  };

  const handleMore = async () => {};

  const handleShare = async () => {
    setShareViewVisible(true);
  };

  const onShareOnMemeFeed = async () => {
    if (!id) return;
    toggleLocker(true);
    mainButton?.showProgress();

    await publishMeme(id, `${tgUser?.user?.id}`);

    mainButton?.hideProgress();
    toggleLocker(false);

    show("Meme published! 10 points added!", { variant: "success" });

    router.replace("/profile");
  };

  const onUnPublish = async () => {
    if (!id) return;

    mainButton?.showProgress();
    toggleLocker(true);

    await unPublish(id, `${tgUser?.user?.id}`);

    mainButton?.hideProgress();
    toggleLocker(false);

    show("Meme unpublished!", { variant: "success" });

    router.replace("/profile");
  };

  const onDeleteMeme = () => {
    if (!id) return;

    telegram?.showConfirm(
      "Are you sure you want to delete this meme?",
      async (status) => {
        if (status) {
          mainButton?.showProgress();
          toggleLocker(true);

          await deleteMeme(id, `${tgUser?.user?.id}`, isPublished);

          mainButton?.hideProgress();
          toggleLocker(false);

          show("Meme deleted!", { variant: "success" });

          router.replace("/profile");
        }
      }
    );
  };

  const isOneSelf = createdById == tgUser?.user?.id?.toString();

  return (
    <Box className={cn("meme")}>
      <div className={cn("meme__image")}>
        <Image
          src={url}
          alt={"image"}
          width={400}
          height={400}
          layout="responsive"
        />
        {isOneSelf ? (
          <Popover
            trigger={
              <IconButton
                icon="threeDots"
                onClick={handleMore}
                className={cn("meme__more")}
              />
            }
          >
            <Box className={cn("meme__more-popover")}>
              <List>
                {!isPublished ? (
                  <ListItem onClick={onShareOnMemeFeed}>Publish</ListItem>
                ) : null}
                {isPublished ? (
                  <ListItem onClick={onUnPublish}>UnPublish</ListItem>
                ) : null}

                <ListItem onClick={onDeleteMeme}>Delete</ListItem>
              </List>
            </Box>
          </Popover>
        ) : null}
      </div>
      <Box className={cn("meme__actions")}>
        <IconButton
          icon="like"
          onClick={handleLike}
          className={cn("meme__like", {
            "meme__like--liked": likes?.find(
              (l) => String(l.userId) == String(tgUser?.user?.id)
            ),
          })}
        />
        <IconButton icon="share" onClick={handleShare} />
      </Box>

      <ShareBox
        id={id}
        caption={caption}
        showMemefeed={!isPublished && isOneSelf}
        isShareBoxOpen={shareViewVisible}
        onShareOnMemeFeed={onShareOnMemeFeed}
        onClose={() => setShareViewVisible(false)}
      />
    </Box>
  );
};

export default Meme;
