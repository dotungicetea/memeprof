"use client";

import { create, persist } from "@/external/zustand";
import { Locale } from "@/locale";

type AppStore = {
  locale: Locale;
  isVerified: boolean;
  setLocale: (locale: Locale) => void;
  setIsVerified: (isVerified: boolean) => void;
};

export const useApp = create(
  persist<AppStore>(
    (set, get) => ({
      isVerified: false,
      locale: "en",

      setIsVerified: (isVerified) => {
        set({ isVerified });
      },
      setLocale: (locale) => {
        set({ locale });
      },
    }),
    {
      name: "memefeed-app",
    }
  )
);

export const selectIsVerified = (state: AppStore) => state.isVerified;
export const selectSetIsVerfied = (state: AppStore) => state.setIsVerified;

export const selectLocale = (state: AppStore) => state.locale;
export const selectSetLocale = (state: AppStore) => state.setLocale;
