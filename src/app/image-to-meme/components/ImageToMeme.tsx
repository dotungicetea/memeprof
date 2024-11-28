"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";

import { AddUnFavourite, addFavourite } from "@/app/text-to-meme/lib/actions";
import { Box } from "@/components/Box";
import {
  selectSnackbarShow,
  useSnackbar,
} from "@/packages/mini-app/components/snackbar/useSnackbar";
import { getMainButton, getTelegram, getTgUser } from "@/utils/getters";
import { useRouter } from "next/navigation";
import { createMeme } from "../lib/actions";

import useBackButton from "@/components/BackButton/useBackButton";
import { useMainButton } from "@/components/MainButton/useMainButton";
import ShareBox from "@/components/ShareBox/ShareBox";
import Dropzone from "@/packages/mini-app/components/dropzone";
import {
  selectToggleGlobalLocker,
  useGlobalTheme,
} from "@/packages/mini-app/store/useGlobalTheme";
import { Meme } from "@prisma/client";
import "keen-slider/keen-slider.min.css";
import { nanoid } from "nanoid";
import Variations from "../../text-to-meme/components/Variations";
import { publishMeme, saveMeme } from "../../text-to-meme/lib/save-meme";
import PromptField from "./PromptField";

import classnames from "classnames/bind";
import styles from "../../text-to-meme/components/TextToMeme.module.scss";
const cn = classnames.bind(styles);

import Steps from "@/packages/mini-app/components/steps";
import classes from "./image-to-meme.module.scss";

const clsx = classnames.bind(classes);

const ImageToMeme = () => {
  const router = useRouter();
  const tgUser = getTgUser();
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [prompt, setPrompt] = useState("");

  const show = useSnackbar(selectSnackbarShow);
  const toggleGlobalLocker = useGlobalTheme(selectToggleGlobalLocker);

  const [genMeme, setGenMeme] = useState<Partial<Meme> | null>(null);
  const [isShareBoxOpen, setIsShareBoxOpen] = useState(false);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [step, setStep] = useState("upload");

  const telegram = getTelegram();
  const mainButton = getMainButton();

  const handleGenerate = async (prompt: string) => {
    toggleGlobalLocker(true, { text: "Generating meme..." });
    mainButton?.showProgress();

    try {
      const generatedMeme = await createMeme(
        tgUser?.user?.id!.toString()!,
        prompt
      );

      setGenMeme(generatedMeme?.[0]);
      toggleGlobalLocker(false);

      const createdMeme = await saveMeme({
        userId: tgUser?.user?.id!.toString()!,
        prompt: genMeme?.prompt as string,
        caption: genMeme?.caption!,
        isPublished: false,
      });

      setGenMeme(createdMeme);
      mainButton?.hideProgress();
      show("You earned 10 points for generating the meme", {
        variant: "success",
      });
    } catch (error: any) {
      telegram?.showAlert(`Error: ${error?.message?.substring(0, 100)}`);

      toggleGlobalLocker(false);
      mainButton?.hideProgress();
    }
  };

  const handlePublish = async () => {
    if (!genMeme?.id) return;

    mainButton?.showProgress();
    toggleGlobalLocker(true, { text: "Publishing meme..." });
    await publishMeme(genMeme?.id, `${tgUser?.user?.id}`);
    mainButton?.hideProgress();
    toggleGlobalLocker(false);

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
    const promptVal = inputRef?.current?.value?.trim();

    if (step === "upload") {
      if (!file) {
        show("Please upload an image", { variant: "error" });
        return;
      }

      setStep("prompt");
      return;
    }

    if (step === "prompt") {
      if (!promptVal || promptVal.length < 10) {
        show("Please enter a prompt with at least 10 characters", {
          variant: "error",
        });
        return;
      }

      setStep("options");
      setPrompt(promptVal as string);
      return;
    }

    if (step === "options") {
      await handleGenerate(prompt as string);

      return;
    }

    if (genMeme) {
      await handlePublish();
      router.push("/profile");
      show("Meme published! 10 points added!", { variant: "success" });
    }
  };

  const mainButtonText = useMemo(() => {
    if (step === "upload" || step === "prompt") return "next";

    if (step === "options") return "meme";

    return "publish";
  }, [step]);

  useBackButton({
    onClick: () => {
      if (step === "prompt") {
        setStep("upload");
      } else if (step === "options") {
        setStep("prompt");
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
          </>

          <ShareBox
            showMemefeed
            onShareOnMemeFeed={handlePublish}
            caption={genMeme?.caption as string}
            id={genMeme?.id as string}
            isShareBoxOpen={isShareBoxOpen}
            onClose={() => setIsShareBoxOpen(false)}
          />
        </Box>
      </div>
    );
  }

  return (
    <div
      className={clsx("img2meme", {
        "img2meme--upload": step === "upload",
        "img2meme--prompt": step === "prompt",
        "img2meme--options": step === "options",
        "img2meme--show": !!file,
      })}
      style={{
        background: file
          ? `linear-gradient(180deg, rgba(0, 0, 0, 0.80) 0%, rgba(0, 0, 0, 0.92) 100%), url(/memes/${
              tgUser?.user?.id
            }/temp.png?${nanoid()}) bottom`
          : undefined,
      }}
    >
      <Steps
        step={step}
        onChange={(newStep) => setStep(newStep)}
        options={[
          {
            label: "Upload",
            value: "upload",
            content: (
              <Dropzone
                onDrop={async (acceptedFiles) => {
                  mainButton?.showProgress();

                  const formData = new FormData();
                  formData.append("file", acceptedFiles[0]);
                  formData.append("userId", String(tgUser?.user?.id)!);

                  const response = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                  });

                  const data = await response.json();
                  setFile(acceptedFiles[0]);
                  setStep("prompt");

                  mainButton?.hideProgress();
                  if (data.status === "success") {
                    show("Image uploaded successfully!", {
                      variant: "success",
                    });
                  } else {
                    show("Error uploading image", { variant: "error" });
                  }
                }}
              />
            ),
          },
          {
            label: "Prompt",
            value: "prompt",
            disabled: !file,
            content: (
              <>
                <PromptField inputRef={inputRef} />
              </>
            ),
          },
          {
            label: "Options",
            value: "options",
            disabled: !file,
            content: (
              <>
                <Variations />
              </>
            ),
          },
          {
            label: "Preview",
            value: "preview",
            disabled: true,
            content: (
              <>
                <p>Preview</p>
              </>
            ),
          },
        ]}
      />
    </div>
  );
};

export default ImageToMeme;
