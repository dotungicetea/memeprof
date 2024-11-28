"use client";

import useBackButton from "@/components/BackButton/useBackButton";
import { ActionButton } from "@/packages/mini-app/components/action-button/ActionButton";
import { getTelegram, getTgUser } from "@/utils/getters";
import { useRouter } from "next/navigation";
import { FormattedMessage } from "react-intl";
import BonusContent from "./components/BonusContent";

const BonusDetails = () => {
  const router = useRouter();
  const tgUser = getTgUser();
  const telegram = getTelegram();

  useBackButton({
    isBackable: true,
    onClick: router.back,
  });

  return (
    <div>
      <BonusContent />

      <ActionButton
        onClick={() => {
          telegram?.openLink(
            `https://t.me/share/url?text=🎉 Join MemeProf and Start Earning Today! 🎉

🔗 Click here to get started: Join MemeProf

Don't miss out on the fun and rewards!&url=https://t.me/memeprofbot/start?startapp=rid${tgUser?.user?.id}`
          );
        }}
      >
        <FormattedMessage id="inviteFrens" />
      </ActionButton>
    </div>
  );
};

export default BonusDetails;
