"use client";

import { create } from "zustand";

const initialState = {
  globalLockerVisible: false,
  backdropClickable: false,
  loadingText: "",
};

export type GlobalThemeStore = {
  globalLockerVisible: boolean;
  backdropClickable: boolean;
  loadingText: string;

  showGlobalLocker: ({
    text,
    backdropClickable,
  }: {
    text?: string;
    backdropClickable?: boolean;
  }) => void;
  hideGlobalLocker: () => void;
  toggleGlobalLocker: (
    visible?: boolean,
    options?: {
      text?: string;
      backdropClickable?: boolean;
    }
  ) => void;

  reset: () => void;
};

export const useGlobalTheme = create<GlobalThemeStore>((set, get) => ({
  ...initialState,

  showGlobalLocker: ({ backdropClickable, text }) => {
    set({ globalLockerVisible: true, backdropClickable, loadingText: text });
  },
  hideGlobalLocker: () => {
    set({
      globalLockerVisible: false,
      backdropClickable: false,
      loadingText: "",
    });
  },
  toggleGlobalLocker: (visible, options) => {
    const previousState = get().globalLockerVisible;

    set({
      globalLockerVisible:
        typeof visible === "boolean" ? visible : !previousState,
      backdropClickable: options?.backdropClickable,
      loadingText: options?.text || "",
    });
  },

  reset: () => {
    set(initialState);
  },
}));

export const selectGlobalLockerVisible = (state: GlobalThemeStore) =>
  state.globalLockerVisible;
export const selectBackdropClickable = (state: GlobalThemeStore) =>
  state.backdropClickable;
export const selectShowGlobalLocker = (state: GlobalThemeStore) =>
  state.showGlobalLocker;
export const selectHideGlobalLocker = (state: GlobalThemeStore) =>
  state.hideGlobalLocker;
export const selectToggleGlobalLocker = (state: GlobalThemeStore) =>
  state.toggleGlobalLocker;
export const selectLoadingText = (state: GlobalThemeStore) => state.loadingText;

export const selectResetGlobalTheme = (state: GlobalThemeStore) => state.reset;
