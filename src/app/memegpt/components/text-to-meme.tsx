"use client";

import { Box } from "@/components/Box";
import Icon from "@/components/Icon";
import RippleBase from "@/components/RippleBase";
import { Typography } from "@/components/Typography";
import { ActionButton } from "@/packages/mini-app/components/action-button/ActionButton";
import { Label } from "@/packages/mini-app/components/label/Label";
import { Textarea } from "@/packages/mini-app/components/textarea/TextArea";
import classNames from "classnames/bind";
import Image from "next/image";
import { FC } from "react";
import { artOptions } from "./constants";
import styles from "./text-to-meme.module.scss";

import { StylePreset } from "@/app/text-to-meme/components/constants";
import { MessageIds } from "@/locale";
import { FormattedMessage } from "react-intl";

const cn = classNames.bind(styles);

type Props = {
  onMainButtonClick: () => void;
  actionText: MessageIds;
  promptRef: React.RefObject<HTMLTextAreaElement>;
  selectedArt: StylePreset | null;
  updateSelectedArt: (art: StylePreset | null) => void;
};

const TextToMeme: FC<Props> = ({
  onMainButtonClick,
  actionText,
  promptRef,
  selectedArt,
  updateSelectedArt,
}) => {
  return (
    <>
      <Box className={cn("text-to-meme__form")}>
        <Textarea ref={promptRef} rows={1} placeholder="Enter your prompt" />
      </Box>
      <Box>
        <Label className={cn("text-to-meme__label")}>Art Style</Label>
        <Box className={cn("text-to-meme__art")}>
          {artOptions.map((option) => (
            <RippleBase
              key={option.label}
              className={cn("text-to-meme__art__item")}
              onClick={() => {
                if (selectedArt === option.value) {
                  updateSelectedArt(null);
                } else {
                  updateSelectedArt(option.value);
                }
              }}
            >
              <Box
                className={cn("text-to-meme__art__item__icon", {
                  "text-to-meme__art__item__icon--selected":
                    selectedArt === option.value,
                })}
              >
                <Image
                  src={`/assets/variants/${option.img}.png`}
                  fill
                  alt=""
                  style={{
                    borderRadius: "1rem",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Typography
                className={cn("text-to-meme__art__item__title", {
                  "text-to-meme__art__item__title--selected":
                    selectedArt === option.value,
                })}
              >
                {option.label}
              </Typography>
            </RippleBase>
          ))}
        </Box>
      </Box>

      <ActionButton
        className={cn(
          "text-to-meme__action",
          "!fixed !bottom-28 !rounded-full !w-auto"
        )}
        onClick={onMainButtonClick}
      >
        <Icon icon="stars" />
        <FormattedMessage id={actionText} />
      </ActionButton>
    </>
  );
};

export default TextToMeme;
