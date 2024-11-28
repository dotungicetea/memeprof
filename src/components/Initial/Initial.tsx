"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getTelegram } from "../../utils";

const Initial = () => {
  const Telegram = getTelegram();
  const params = useParams();
  const query = useSearchParams();

  useEffect(() => {
    if (Telegram) {
      console.log(params, query);
    }
  }, []);

  useEffect(() => {
    if (Telegram) {
      Telegram.ready?.();

      if (!Telegram.isExpanded) {
        Telegram.expand?.();
      }
    }
  }, [Telegram, Telegram?.isExpanded]);

  useEffect(() => {
    if (Telegram?.isVerticalSwipesEnabled) {
      Telegram?.disableVerticalSwipes();
    }
  }, [Telegram, Telegram?.isVerticalSwipesEnabled]);

  return null;
};

export default Initial;
