"use client";

import { Box } from "@/components/Box";
import {
  selectToggleGlobalLocker,
  useGlobalTheme,
} from "@/packages/mini-app/store/useGlobalTheme";
import { getTelegram, getTgUser, isEmpty } from "@/utils";
import { Verification } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import React, { FC, useEffect } from "react";
import useSWR from "swr";

type Props = {
  children: React.ReactNode;
};

const fetcher = async () => {
  const tgUser = getTgUser();

  const res = await fetch(`/api/auth/verification?id=${tgUser?.user?.id}`);
  return res.json();
};

const VerificationThemeProvider: FC<Props> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const telegram = getTelegram();
  const toggleGlobalLocker = useGlobalTheme(selectToggleGlobalLocker);

  const {
    data: tasks,
    isLoading,
    mutate,
  } = useSWR(
    !isEmpty(telegram?.initDataUnsafe) ? "verification" : undefined,
    fetcher,
    {
      onSuccess: (data) => {
        if (
          data &&
          data?.length &&
          data?.filter((task: Verification) => !task.isCompleted).length &&
          pathname !== "/verification" &&
          !pathname?.includes("tasks")
        ) {
          router.replace("/verification");
        } else if (
          Array.isArray(data) &&
          !data?.filter((task: Verification) => !task.isCompleted).length
        ) {
          toggleGlobalLocker(false);

          telegram?.CloudStorage.setItem(
            "verificationStatus",
            "passed",
            (err, stored) => {
              if (stored) {
                if (
                  pathname === "/verification" ||
                  pathname?.includes("tasks")
                ) {
                  router.replace("/");
                }
              } else if (err) {
                console.error(err);
              }
            }
          );

          if (pathname === "/verification" || pathname?.includes("tasks")) {
            router.replace("/");
          }
        }
      },

      onError: () => {
        toggleGlobalLocker(false);
      },
    }
  );

  useEffect(() => {
    telegram?.CloudStorage?.getItem("verificationStatus", (error, value) => {
      if (error) {
        console.error(error);

        telegram?.showAlert("Error occured while checking verification status");
      }

      if (
        value === "passed" &&
        tasks?.filter((task: Verification) => !task.isCompleted).length
      ) {
        telegram.CloudStorage?.removeItem("verificationStatus");
        mutate();
      }

      if (value !== "passed" && isLoading) {
        toggleGlobalLocker(true, { text: "Verifying" });
      } else {
        toggleGlobalLocker(false);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [telegram, tasks, toggleGlobalLocker, isLoading]);

  return <Box>{children}</Box>;
};

export default VerificationThemeProvider;
