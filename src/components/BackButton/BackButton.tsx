"use client";

import { genuid, getTelegram } from "@/utils";
import { FC, useEffect, useState } from "react";

type BackButtonProps = {
  onClick?: () => void;
  isBackable?: boolean;
};

const BackButton: FC<BackButtonProps> = ({ onClick, isBackable }) => {
  const [updatedBackButton, setUpdatedBackButton] = useState<string | boolean>(
    false
  );

  const Telegram = getTelegram();
  const backButton = getTelegram()?.BackButton;

  useEffect(() => {
    if (isBackable) backButton?.show();
    else backButton?.hide();
  }, [isBackable, backButton]);

  useEffect(() => {
    if (updatedBackButton) {
      Telegram?.HapticFeedback.impactOccurred("light");
      onClick?.();
    } else {
      Telegram?.BackButton?.onClick(() => setUpdatedBackButton(genuid()));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedBackButton]);

  return null;
};

export default BackButton;
