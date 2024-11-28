"use client";

import { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { messages } from "../../locale";
import { genuid, getTelegram } from "../../utils";

export type MainButtonProps = {
  onClick: () => void;
  text: keyof (typeof messages)["en"];
  disabled?: boolean;
  processing?: boolean;
  showProgress?: boolean;
  values?: Record<string, any>;
  color?: string;
  text_color?: string;
};

export const useMainButton = ({
  onClick,
  text,
  disabled,
  processing,
  showProgress,
  values,
  color,
  text_color,
}: MainButtonProps) => {
  const [mainButtonUpdated, setMainButtonUpdated] = useState<boolean | string>(
    false
  );
  const colorChangedRef = useRef<boolean>(false);

  const intl = useIntl();

  const Telegram = getTelegram();
  const mainButton = Telegram?.MainButton;

  const message = intl.formatMessage({ id: text }, values);

  if (showProgress) {
    mainButton?.showProgress();
  } else if (mainButton?.isProgressVisible) {
    mainButton.hideProgress();
  }

  if (processing) {
    mainButton?.setParams({
      text: message,
      is_active: false,
      is_visible: true,
      color: "#e0e0e0",
      text_color: "#9e9e9e",
    });
  } else {
    if (color && !colorChangedRef.current) {
      colorChangedRef.current = true;

      mainButton?.hide?.();
    }

    mainButton?.setParams({
      text: message,
      is_active: !disabled && !processing,
      is_visible: true,
      color: color ?? "#fbba00",
      text_color: text_color || undefined,
    });
  }

  const handleMainButtonClick = () => setMainButtonUpdated(genuid());

  useEffect(() => {
    if (mainButtonUpdated) onClick();
    else mainButton?.onClick(handleMainButtonClick);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainButtonUpdated]);

  useEffect(() => {
    if (
      process.env.NODE_ENV === "development" &&
      typeof window !== "undefined"
    ) {
      const button = document.createElement("button");

      button.innerText = message;
      button.onclick = handleMainButtonClick;
      button.style.position = "fixed";
      button.style.bottom = "0";
      button.style.left = "50%";
      button.style.transform = "translateX(-50%)";
      button.style.zIndex = "999999";
      button.style.padding = "10px";
      button.style.backgroundColor = "#fbba00";
      button.style.color = "#000";
      button.style.border = "none";
      button.style.cursor = "pointer";
      button.style.width = "100%";
      button.style.maxWidth = "550px";

      document.body.appendChild(button);
    }
  }, []);

  return mainButton;
};
