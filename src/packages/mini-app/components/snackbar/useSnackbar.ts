"use client";

import { create } from "zustand";

export type SnackbarStore = {
  visible: boolean;
  message: string;
  timeout: number;
  variant: "success" | "error" | "warning" | "info";

  show: (
    message: string,
    options?: {
      variant?: "success" | "error" | "warning" | "info";
      timeout?: number;
    }
  ) => void;
  hide: () => void;
};

export const useSnackbar = create<SnackbarStore>((set, get) => ({
  visible: false,
  timeout: 3000,
  message: "",
  variant: "info",

  show: (message, options = {}) => {
    set({ visible: true, message, ...options });

    setTimeout(() => {
      set((state) => ({ ...state, visible: false, message: "" }));
    }, get().timeout);
  },
  hide: () => {
    set({ visible: false, message: "", timeout: 3000, variant: "info" });
  },
}));

export const selectSnackbarVisible = (state: SnackbarStore) => state.visible;
export const selectSnackbarMessage = (state: SnackbarStore) => state.message;
export const selectSnackbarTimeout = (state: SnackbarStore) => state.timeout;
export const selectSnackbarVariant = (state: SnackbarStore) => state.variant;
export const selectSnackbarShow = (state: SnackbarStore) => state.show;
export const selectSnackbarHide = (state: SnackbarStore) => state.hide;
