"use client";

import useBackButton from "@/components/BackButton/useBackButton";
import { useRouter } from "next/navigation";

const TgActions = () => {
  const router = useRouter();

  useBackButton({
    isBackable: true,
    onClick: router.back,
  });

  return null;
};

export default TgActions;
