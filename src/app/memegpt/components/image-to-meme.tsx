"use client";

import { Box } from "@/components/Box";
import React, { FC, useState } from "react";

import styles from "./image-to-meme.module.scss";
import classNames from "classnames/bind";
import Card from "@/components/Card";
import { Label } from "@/packages/mini-app/components/label/Label";
import { Textarea } from "@/packages/mini-app/components/textarea/TextArea";
import { ActionButton } from "@/packages/mini-app/components/action-button/ActionButton";
import Icon from "@/components/Icon";
import { FormattedMessage } from "react-intl";
import { MessageIds } from "@/locale";
import Dropzone from "@/packages/mini-app/components/dropzone";
import { getTgUser, noop } from "@/utils";
import {
  selectSnackbarShow,
  useSnackbar,
} from "@/packages/mini-app/components/snackbar/useSnackbar";

const cn = classNames.bind(styles);

type Props = {
  onMainButtonClick: () => void;
  actionText: MessageIds;
  promptRef: React.RefObject<HTMLTextAreaElement>;
};

const ImageToMeme: FC<Props> = ({
  onMainButtonClick,
  actionText,
  promptRef,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const show = useSnackbar(selectSnackbarShow);

  const tgUser = getTgUser();

  return (
    <Box>
      <Box className={cn("gpt__form")}>
        <Card className={cn("gpt__uploader")}>
          <Dropzone
            onDrop={async (acceptedFiles) => {
              console.log(acceptedFiles);
              //   const formData = new FormData();
              //   formData.append("file", acceptedFiles[0]);
              //   formData.append("userId", String(tgUser?.user?.id)!);
              //   const response = await fetch("/api/upload", {
              //     method: "POST",
              //     body: formData,
              //   });
              //   const data = await response.json();
              //   setFile(acceptedFiles[0]);
              //   if (data.status === "success") {
              //     show("Image uploaded successfully!", {
              //       variant: "success",
              //     });
              //   } else {
              //     show("Error uploading image", { variant: "error" });
              //   }
            }}
          />
        </Card>
      </Box>
      <Box className={cn("gpt__form")}>
        <Textarea ref={promptRef} rows={1} placeholder="Enter Your Prompt" />
      </Box>

      <ActionButton
        className={cn(
          "text-to-meme__action",
          "!fixed !bottom-28 !rounded-full !w-auto"
        )}
        onClick={noop}
      >
        <Icon icon="stars" />
        <FormattedMessage id={actionText} />
      </ActionButton>
    </Box>
  );
};

export default ImageToMeme;
