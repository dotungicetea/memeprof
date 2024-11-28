"use client";

import BackButton from "@/components/BackButton";
import useBackButton from "@/components/BackButton/useBackButton";
import { Box } from "@/components/Box";
import {
  selectSnackbarShow,
  useSnackbar,
} from "@/packages/mini-app/components/snackbar/useSnackbar";
import { useRouter } from "next/navigation";
import LanguageFormGroup from "./LanguageFormGroup";

import { selectLocale, selectSetLocale, useApp } from "@/hooks/useApp";
import { Locale } from "@/locale";
import classnames from "classnames/bind";
import { useIntl } from "react-intl";
import styles from "./LanguagePage.module.scss";
const cn = classnames.bind(styles);

const Languages = () => {
  const intl = useIntl();
  const router = useRouter();
  const show = useSnackbar(selectSnackbarShow);

  const locale = useApp(selectLocale);
  const setLocale = useApp(selectSetLocale);

  const handleLanguageChange = async (value: Locale) => {
    setLocale(value);

    show(`${intl.formatMessage({ id: "langChanged" })}: ${value}`, {
      variant: "success",
    });
  };

  useBackButton({
    isBackable: true,
    onClick: router.back,
  });

  return (
    <Box className={cn("language")}>
      <BackButton isBackable={true} />
      <LanguageFormGroup
        legend="profAppLanguage"
        defaultValue={locale}
        onChange={handleLanguageChange}
      />
    </Box>
  );
};

export default Languages;
