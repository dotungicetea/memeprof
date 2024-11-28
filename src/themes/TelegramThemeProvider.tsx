"use client";

import { Box } from "@/components/Box";
import { selectLocale, useApp } from "@/hooks/useApp";
import { messages } from "@/locale";
import Snackbar from "@/packages/mini-app/components/snackbar/Snackbar";
import useSetHeaderBg from "@/packages/mini-app/hooks/useSetHeaderBg";
import { getTelegram, getTgUser } from "@/utils";
import React, { FC, useEffect } from "react";
import { IntlProvider } from "react-intl";
import flattenMessages from "../utils/helpers";
import { useSWRConfig } from "swr";

type Props = {
  children: React.ReactNode;
};

//&url=https://t.me/memeprofbot/start?startapp=rid${tgUser?.user?.id}`
const getReferrerId = (params: string) => {
  const referreId = params.split("rid")[1];
  return referreId;
};

const TelegramThemeProvider: FC<Props> = ({ children }) => {
  const locale = useApp(selectLocale);
  const telegram = getTelegram();
  const tgUser = getTgUser();
  const { mutate } = useSWRConfig();

  useSetHeaderBg();
  const startParam = telegram?.initDataUnsafe?.start_param ?? "";
  console.log("startParam", startParam);

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://telegram.org/js/telegram-widget.js?22";
  //   script.dataset.telegramLogin = "meme_gpt_robot";
  //   script.dataset.size = "large";
  //   script.dataset.authUrl = "http://127.0.0.1:3000/api/auth/callback";
  //   script.dataset.requestAccess = "write";
  //   document.body.appendChild(script);
  // }, []);

  const referrer = getReferrerId(startParam);
  console.log("referrer", referrer);

  useEffect(() => {
    try {
      const authUser = async () => {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({
          //   userId: String(tgUser?.user?.id),
          //   referrer: referrer ? String(referrer) : null,
          //   first_name: tgUser?.user?.first_name,
          //   last_name: tgUser?.user?.last_name,
          //   username: tgUser?.user?.username,
          //   language_code: tgUser?.user?.language_code,
          // }),
          body: JSON.stringify({
            userId: "1484837473",
            referrer: null,
            first_name: "Tung",
            last_name: "Do",
            username: "@domanhtung",
            language_code: "en",
          }),
        });

        const data = await response.json();

        if (data?.error) {
          console.error("error registering user", data.error);
        }

        mutate(`/api/user/${tgUser?.user?.id}`);
      };

      authUser();
    } catch (error) {
      console.error("error registering user", error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [referrer, tgUser]);

  return (
    <Box>
      <IntlProvider
        locale={locale}
        defaultLocale="en"
        messages={flattenMessages(messages[locale ?? "en"])}
      >
        <Snackbar />
        {children}
      </IntlProvider>
    </Box>
  );
};

export default TelegramThemeProvider;
