"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";

import {
  AddUnFavourite,
  addFavourite,
  createMeme,
} from "@/app/text-to-meme/lib/actions";
import { Box } from "@/components/Box";
import {
  selectSnackbarShow,
  useSnackbar,
} from "@/packages/mini-app/components/snackbar/useSnackbar";
import { getMainButton, getTelegram, getTgUser } from "@/utils/getters";
import { useRouter, useSearchParams } from "next/navigation";

import useBackButton from "@/components/BackButton/useBackButton";
import Icon from "@/components/Icon";
import { useMainButton } from "@/components/MainButton/useMainButton";
import ShareBox from "@/components/ShareBox/ShareBox";
import {
  selectToggleGlobalLocker,
  useGlobalTheme,
} from "@/packages/mini-app/store/useGlobalTheme";
import { Meme } from "@prisma/client";
import classnames from "classnames/bind";
import "keen-slider/keen-slider.min.css";
import { nanoid } from "nanoid";
import { moveCaption } from "../lib/edit-caption";
import { publishMeme, saveMeme } from "../lib/save-meme";
import ArtStyleSelector from "./ArtStyleSelector";
import PromptField from "./PromptField";
import styles from "./TextToMeme.module.scss";
import Variations from "./Variations";
import { StylePreset } from "./constants";

const cn = classnames.bind(styles);

const Memes = () => {
  const router = useRouter();
  const tgUser = getTgUser();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const stylePresetRef = useRef<StylePreset | null>(null);
  const show = useSnackbar(selectSnackbarShow);
  const toggleGlobalLocker = useGlobalTheme(selectToggleGlobalLocker);

  const [genMeme, setGenMeme] = useState<Partial<Meme> | null>(null);
  const [isShareBoxOpen, setIsShareBoxOpen] = useState(false);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [captionPos, setCaptionPos] = useState<"up" | "down">("up");

  const telegram = getTelegram();
  const mainButton = getMainButton();

  const handleGenerate = async (prompt: string) => {
    toggleGlobalLocker(true);
    mainButton?.showProgress(false);

    try {
      const generatedMeme = await createMeme(
        tgUser?.user?.id!.toString()!,
        prompt,
        {
          style: stylePresetRef.current,
          contestId: searchParams?.get("contestId")!,
        }
      );

      setGenMeme(generatedMeme?.[0]);
      toggleGlobalLocker(false);
      mainButton?.hideProgress();
    } catch (error: any) {
      telegram?.showAlert(`Error: ${error?.message?.substring(0, 100)}`);

      toggleGlobalLocker(false);
      mainButton?.hideProgress();
    }
  };

  const handlePublish = async () => {
    if (!genMeme?.id) return;

    mainButton?.showProgress();
    await publishMeme(genMeme?.id, `${tgUser?.user?.id}`);
    mainButton?.hideProgress();

    show("Meme published! 10 points added!", { variant: "success" });

    router.push("/profile");
  };

  const handleFavourite = async () => {
    setIsFavourite(!isFavourite);

    if (isFavourite) {
      await AddUnFavourite(genMeme?.id!, tgUser?.user?.id.toString()!);
      show("removed from favorites!", { variant: "success" });
    } else {
      await addFavourite(genMeme?.id!, tgUser?.user?.id.toString()!);
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
        userId: tgUser?.user?.id!.toString()!,
        prompt: genMeme?.prompt as string,
        caption: genMeme?.caption!,
        isPublished: true,
      });
      setIsSaved(true);
      setGenMeme(createdMeme);
      toggleGlobalLocker(false);
      show("Meme published! 20 points added!", { variant: "success" });

      router.push("/profile");
    } else {
      const currentPrompt = inputRef?.current?.value?.trim();

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
      tgUser?.user?.id?.toString()!,
      genMeme?.caption!
    );

    setGenMeme({
      ...meme,
      prompt: genMeme?.prompt ?? "",
      url: `/memes/${tgUser?.user?.id}/meme.png?${nanoid()}`,
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
        userId: tgUser?.user?.id!.toString()!,
        prompt: genMeme?.prompt as string,
        caption: genMeme?.caption!,
        isPublished: false,
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
    if (isSaved) {
      return "publish";
    }

    if (isEditMode) {
      return "back";
    }

    if (genMeme?.id) {
      return "saveAndPublish";
    }

    return "meme";
  }, [genMeme, isEditMode, isSaved]);

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

  useMainButton({
    text: mainButtonText,
    onClick: onMainButtonClick,
  });

  if (genMeme && genMeme.url) {
    return (
      <div className={cn("meme__container")}>
        <div className={cn("meme__image-container")}>
          <Image
            fill
            alt={genMeme?.caption || "Meme generated by memeprof bot"}
            src={genMeme.url}
            style={{
              objectFit: "contain",
            }}
          />
        </div>

        <Box className={cn("meme__buttons")}>
          {isSaved ? (
            <>
              <Box className={cn("meme__button-container")}>
                <button
                  className={cn(isFavourite ? "meme__fav-btn" : "meme__btn")}
                  onClick={handleFavourite}
                >
                  {isFavourite ? "Remove from favourite" : "Add to favourite"}
                </button>
              </Box>
              <Box className={cn("meme__button-container")}>
                <button
                  className={cn("meme__btn")}
                  onClick={() => {
                    setIsShareBoxOpen(true);
                  }}
                >
                  Share
                </button>
              </Box>
              <ShareBox
                showMemefeed
                onShareOnMemeFeed={handlePublish}
                caption={genMeme?.caption as string}
                id={genMeme?.id as string}
                isShareBoxOpen={isShareBoxOpen}
                onClose={() => setIsShareBoxOpen(false)}
              />
            </>
          ) : null}
          {!isEditMode && !isSaved ? (
            <>
              <Box className={cn("meme__button-container")}>
                <button className={cn("meme__btn")} onClick={handleEdit}>
                  Edit
                </button>
              </Box>
              <Box className={cn("meme__button-container")}>
                <button className={cn("meme__btn")} onClick={onSave}>
                  Save
                </button>
              </Box>
            </>
          ) : null}
          {!isSaved && isEditMode ? (
            <Box>
              <Box className={cn("meme__button-container")}>
                <button className={cn("meme__btn")} onClick={onMoveCaption}>
                  {captionPos === "up"
                    ? "Move Caption Down"
                    : "Move Caption Up"}
                </button>
              </Box>
              <Box className={cn("meme__button-container")}>
                <button
                  className={cn(isFavourite ? "meme__fav-btn" : "meme__btn")}
                  onClick={onMoveCaption}
                  disabled
                >
                  Edit Caption
                  <Icon icon="premium" color="cta" />
                </button>
              </Box>

              <Box className={cn("meme__button-container")}>
                <button
                  className={cn(isFavourite ? "meme__fav-btn" : "meme__btn")}
                  onClick={onMoveCaption}
                  disabled
                >
                  Edit Image
                  <Icon icon="premium" color="cta" />
                </button>
              </Box>
            </Box>
          ) : null}
        </Box>
      </div>
    );
  }

  return (
    <Box>
      <PromptField inputRef={inputRef} />
      <ArtStyleSelector valueRef={stylePresetRef} />
      <Variations />
    </Box>
  );
};

export default Memes;
