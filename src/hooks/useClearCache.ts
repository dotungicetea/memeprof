import {
  selectResetGlobalTheme,
  useGlobalTheme,
} from "@/packages/mini-app/store/useGlobalTheme";
import { getTelegram } from "@/utils";

export const useClearCache = () => {
  const telegram = getTelegram();
  const reset = useGlobalTheme(selectResetGlobalTheme);

  const onClearCache = () => {
    telegram?.showPopup(
      {
        title: "Are you sure?",
        message: "Do you want to clear the cache?",
        buttons: [
          {
            id: "yes",
            text: "clear cache",
            type: "destructive",
          },
          {
            id: "no",
            text: "Cancel",
            type: "cancel",
          },
        ],
      },
      (id) => {
        if (id === "yes") {
          reset();
          window?.localStorage?.clear();
          telegram?.CloudStorage?.getKeys((err, keys) => {
            if (err) return console.error(err);

            keys.forEach((key) => {
              telegram.CloudStorage?.removeItem(key);
            });
          });
        }
      }
    );
  };

  return { onClearCache };
};
