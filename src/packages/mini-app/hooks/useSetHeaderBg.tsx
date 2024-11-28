import { getTelegram } from "@/utils";
import { useEffect } from "react";

const useSetHeaderBg = (bgColor?: string) => {
  const telegram = getTelegram();

  useEffect(() => {
    if (telegram && bgColor) {
      telegram.setHeaderColor(bgColor);
    } else if (telegram) {
      telegram.setHeaderColor(
        "#000000"
        // telegram?.colorScheme === "dark" ? "#000000" : "#ffffff"
      );
    }
  }, [bgColor, telegram]);

  return null;
};

export default useSetHeaderBg;
