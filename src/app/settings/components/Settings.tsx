"use client";

import {
  MEME_PAPER_LINK,
  PROFAPP_CHANNLE_LINK,
  SUPPORT_BOT_LINK,
} from "@/app/constants";
import useBackButton from "@/components/BackButton/useBackButton";
import { Box } from "@/components/Box";
import { Typography } from "@/components/Typography";
import { useClearCache } from "@/hooks/useClearCache";
import { getTelegram } from "@/utils";
import classnames from "classnames/bind";
import { useRouter } from "next/navigation";
import { FormattedMessage, useIntl } from "react-intl";
import SettingCard from "./SettingCard";
import styles from "./Settings.module.scss";

const cn = classnames.bind(styles);

const Settings = () => {
  const router = useRouter();
  const telegram = getTelegram();
  const intl = useIntl();

  const { onClearCache } = useClearCache();

  const handleDownloadPDF = () => {
    telegram?.openLink(MEME_PAPER_LINK, {
      try_instant_view: true,
    });
  };

  useBackButton({
    isBackable: true,
    onClick: () => {
      router.replace("/menu");
    },
  });

  return (
    <Box className={cn("setting")}>
      <Box className={cn("setting__general-container")}>
        <Box>
          <Typography variant="h1">
            <FormattedMessage id="settings" />
          </Typography>
          <Typography className={cn("setting__subtitle")}>
            <FormattedMessage id="general" />
          </Typography>
        </Box>

        <SettingCard
          onClick={() => {
            router.push("/settings/languages");
          }}
          icon="langauge"
          description={intl.formatMessage({ id: "profAppLanguage" })}
          className={cn("setting__icon--language")}
        />
        <SettingCard
          onClick={handleDownloadPDF}
          icon="questionMark"
          description={intl.formatMessage({ id: "memePaper" })}
          className={cn("setting__icon--memepaper")}
        />
      </Box>
      <Box className={cn("setting__help-container")}>
        <Typography className={cn("setting__subtitle")}>
          <FormattedMessage id="help" />
        </Typography>

        <SettingCard
          onClick={() => {
            telegram?.openTelegramLink(SUPPORT_BOT_LINK);
          }}
          icon="support"
          description={intl.formatMessage({ id: "contactSupport" })}
          className={cn("setting__icon--support")}
        />

        <SettingCard
          onClick={() => {
            telegram?.openTelegramLink(PROFAPP_CHANNLE_LINK);
          }}
          icon="news"
          description={intl.formatMessage({ id: "profAppNews" })}
          className={cn("setting__icon--news")}
        />
      </Box>
      <Box className={cn("setting__help-container")}>
        <Typography className={cn("setting__subtitle")}>
          <FormattedMessage id="actions" />
        </Typography>

        <SettingCard
          onClick={onClearCache}
          icon="removeBin"
          description={intl.formatMessage({ id: "clearCache" })}
          className={cn("setting__icon--cache")}
        />
      </Box>
    </Box>
  );
};

export default Settings;
