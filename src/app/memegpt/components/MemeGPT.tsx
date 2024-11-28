"use client";

import useBackButton from "@/components/BackButton/useBackButton";
import { Box } from "@/components/Box";
import Icon from "@/components/Icon";
import { ActionButton } from "@/packages/mini-app/components/action-button/ActionButton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/packages/mini-app/components/tabs/Tabs";
import { getTelegram } from "@/utils";
import classNames from "classnames/bind";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useMemo, useState } from "react";
import styles from "./meme-gpt.module.scss";

import { useRef } from "react";

import {
  addFavourite,
  AddUnFavourite,
  createMeme,
} from "@/app/text-to-meme/lib/actions";
import {
  selectSnackbarShow,
  useSnackbar,
} from "@/packages/mini-app/components/snackbar/useSnackbar";
import { getTgUser } from "@/utils/getters";

import { StylePreset } from "@/app/text-to-meme/components/constants";
import { moveCaption } from "@/app/text-to-meme/lib/edit-caption";
import { publishMeme, saveMeme } from "@/app/text-to-meme/lib/save-meme";
import Button from "@/components/Button";
import ShareBox from "@/components/ShareBox/ShareBox";
import { Typography } from "@/components/Typography";
import {
  selectToggleGlobalLocker,
  useGlobalTheme,
} from "@/packages/mini-app/store/useGlobalTheme";
import { Contest, ContestTask, Meme } from "@prisma/client";
import "keen-slider/keen-slider.min.css";
import { nanoid } from "nanoid";
import { FormattedMessage } from "react-intl";
import ImageToMeme from "./image-to-meme";
import TextToMeme from "./text-to-meme";

const cn = classNames.bind(styles);

type MemeGPTProps = {
  contest: Nullable<Contest>;
  task: Nullable<ContestTask>;
};

const MemeGPT: FC<MemeGPTProps> = ({ contest, task }) => {
  const telegram = getTelegram();
  const router = useRouter();
  const tgUser = getTgUser();
  const promptRef = useRef<HTMLTextAreaElement | null>(null);
  const show = useSnackbar(selectSnackbarShow);
  const toggleGlobalLocker = useGlobalTheme(selectToggleGlobalLocker);

  const [genMeme, setGenMeme] = useState<Partial<Meme> | null>(null);
  const [isShareBoxOpen, setIsShareBoxOpen] = useState(false);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [captionPos, setCaptionPos] = useState<"up" | "down">("up");

  const [selectedArt, setSelectedArt] = useState<StylePreset | null>(null);

  const tgUserId = String(tgUser?.user?.id);

  useBackButton({
    onClick: () => {
      if (isSaved) {
        telegram?.showConfirm(
          "Are you sure you want to leave?",

          (bool) => {
            if (bool) {
              router.back();
            }
          }
        );
      } else if (isEditMode) {
        setIsEditMode(false);
      } else {
        router.back();
      }
    },
    isBackable: true,
  });

  const handleGenerate = async (prompt: string) => {
    toggleGlobalLocker(true);

    try {
      const generatedMeme = await createMeme(tgUserId, prompt, {
        style: selectedArt,
        contestId: contest?.id,
        taskId: task?.id,
      });

      setGenMeme(generatedMeme?.[0]);
      toggleGlobalLocker(false);
    } catch (error: any) {
      telegram?.showAlert(`Error: ${error?.message?.substring(0, 100)}`);

      toggleGlobalLocker(false);
    }
  };

  const handlePublish = async () => {
    if (!genMeme?.id) return;

    toggleGlobalLocker(true);
    await publishMeme(genMeme?.id, `${tgUserId}`, task?.id);
    toggleGlobalLocker(false);

    show("Meme published! 10 points added!", { variant: "success" });

    router.push("/profile");
  };

  const handleFavourite = async () => {
    setIsFavourite(!isFavourite);

    if (isFavourite) {
      await AddUnFavourite(genMeme?.id!, tgUserId);
      show("removed from favorites!", { variant: "success" });
    } else {
      await addFavourite(genMeme?.id!, tgUserId);
      show("add to favorites!", { variant: "success" });
    }
  };

  const onMainButtonClick = async () => {
    if (isSaved) {
      handlePublish();
    } else if (isEditMode) {
      setIsEditMode(false);
    } else if (genMeme) {
      toggleGlobalLocker(true);

      const createdMeme = await saveMeme({
        userId: tgUserId,
        prompt: genMeme?.prompt as string,
        caption: genMeme?.caption!,
        isPublished: true,
        taskId: task?.id,
      });
      setIsSaved(true);
      setGenMeme(createdMeme);
      toggleGlobalLocker(false);
      show("Meme published! 20 points added!", { variant: "success" });

      router.push("/profile");
    } else {
      const currentPrompt = promptRef?.current?.value?.trim();

      if (currentPrompt) {
        handleGenerate(currentPrompt);
      } else {
        show("Please enter a prompt", { variant: "error" });
      }
    }
  };

  const onMoveCaption = async () => {
    toggleGlobalLocker(true);

    const meme = await moveCaption(
      genMeme?.id ?? "123",
      captionPos === "up" ? "down" : "up",
      tgUserId,
      genMeme?.caption!
    );

    setGenMeme({
      ...meme,
      prompt: genMeme?.prompt ?? "",
      url: `/memes/${tgUserId}/meme.png?${nanoid()}`,
    });
    setCaptionPos(captionPos === "up" ? "down" : "up");
    toggleGlobalLocker(false);
  };

  const handleEdit = async () => {
    setIsEditMode(true);
  };

  const onSave = async () => {
    toggleGlobalLocker(true);

    try {
      const createdMeme = await saveMeme({
        userId: tgUserId,
        prompt: genMeme?.prompt as string,
        caption: genMeme?.caption!,
        isPublished: false,
        taskId: task?.id,
      });
      setIsSaved(true);
      setGenMeme(createdMeme);
      toggleGlobalLocker(false);
      show("You earned 10 points for generating the meme", {
        variant: "success",
      });
    } catch (err) {
      console.error("Error occured while saving meme 🥲", err);

      show("Error occured while saving meme", { variant: "error" });
      toggleGlobalLocker(false);
    }
  };

  const mainButtonText = useMemo(() => {
    if (isSaved) return "publish";
    if (isEditMode) return "back";
    if (genMeme?.id) return "saveAndPublish";

    return "meme";
  }, [genMeme, isEditMode, isSaved]);

  const onShare = async () => {
    if (!isSaved) {
      const createdMeme = await saveMeme({
        userId: tgUserId,
        prompt: genMeme?.prompt as string,
        caption: genMeme?.caption!,
        isPublished: false,
        taskId: task?.id,
      });
      setGenMeme(createdMeme);
      setIsSaved(true);
    }

    setIsShareBoxOpen(true);
  };

  const onCloseShare = () => {
    setIsShareBoxOpen(false);
  };

  if (genMeme && genMeme.url) {
    return (
      <Box className={cn("meme")}>
        <Box className={cn("meme__image")}>
          <Image
            fill
            alt={genMeme?.caption || "Meme generated by memeprof bot"}
            src={genMeme.url}
            style={{
              objectFit: "contain",
            }}
          />
        </Box>

        <Box className={cn("meme__actions")}>
          {isSaved ? null : (
            <Button
              className={cn("meme__actions__button")}
              onClick={onSave}
              variant="outlined"
            >
              <Icon icon="save" />
              Save
            </Button>
          )}
          <Button
            className={cn("meme__actions__button")}
            onClick={onShare}
            variant="outlined"
          >
            <Icon icon="share" />
            Share
          </Button>
        </Box>

        <ActionButton
          className={cn(
            "gpt__action",

            "!fixed !bottom-0"
          )}
          onClick={onMainButtonClick}
        >
          <Icon icon="stars" />
          test
          <FormattedMessage id={mainButtonText} />
        </ActionButton>

        <ShareBox
          showMemefeed
          id={genMeme.id!}
          caption={genMeme.caption!}
          onClose={onCloseShare}
          isShareBoxOpen={isShareBoxOpen}
          onShareOnMemeFeed={onMainButtonClick}
        />
      </Box>
    );
  }

  return (
    <Box className={cn("root")}>
      <Tabs defaultValue="text2meme" className="w-full">
        {contest ? (
          <Box className={cn("flex items-center gap-4")}>
            <Image
              src={contest?.avatarUrl}
              alt={contest?.title}
              width={35}
              height={35}
            />
            <Box className="flex flex-col">
              <Typography
                variant="h6"
                className="!font-bold !text-lg truncate whitespace-nowrap"
              >
                {contest?.title}
              </Typography>
              <Typography
                variant="caption"
                className="!text-gray-500 !text-sm !font-normal"
                style={{
                  lineHeight: "1rem !important",
                }}
              >
                You are participating in {contest?.title} contest
              </Typography>
            </Box>
          </Box>
        ) : (
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="text2meme">
              <Icon icon="text2meme" />
              Text to Meme
            </TabsTrigger>
            <TabsTrigger value="image2meme">
              <Icon icon="image2meme" />
              Image to Meme
            </TabsTrigger>
          </TabsList>
        )}
        <TabsContent value="text2meme">
          <TextToMeme
            promptRef={promptRef}
            onMainButtonClick={onMainButtonClick}
            actionText={mainButtonText}
            selectedArt={selectedArt}
            updateSelectedArt={setSelectedArt}
          />
        </TabsContent>
        <TabsContent value="image2meme">
          <ImageToMeme
            promptRef={promptRef}
            onMainButtonClick={onMainButtonClick}
            actionText={mainButtonText}
          />
        </TabsContent>
      </Tabs>
    </Box>
  );
};

export default MemeGPT;
