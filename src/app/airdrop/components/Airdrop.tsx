"use client";

import useBackButton from "@/components/BackButton/useBackButton";
import { Typography } from "@/components/Typography";
import {
  TonConnectButton,
  useTonAddress,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import classnames from "classnames/bind";
import { useRouter } from "next/navigation";
import LogoIcon from "./LogoIcon";
import styles from "./airdrop.module.scss";
import Button from "@/components/Button";
import { Box } from "@/components/Box";
import Icon from "@/components/Icon";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/packages/mini-app/components/tabs/Tabs";
import ComingSoon from "@/components/ComingSoon/ComingSoon";
import { FormattedMessage } from "react-intl";

const cn = classnames.bind(styles);

const Wallet = () => {
  const router = useRouter();
  const tonAddress = useTonAddress();
  const [tonConnectUI, setOptions] = useTonConnectUI();

  useBackButton({
    isBackable: true,
    onClick: router.back,
  });

  return (
    <div className={cn("wallet")}>
      <Tabs defaultValue="withdrawal">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="points">Points</TabsTrigger>
          <TabsTrigger value="withdrawal">Withdrawal</TabsTrigger>
        </TabsList>

        <TabsContent
          value="points"
          className="pt-8 flex items-center justify-center"
        >
          <Typography variant="h1" className={cn("coming__title")}>
            <FormattedMessage id="comingSoon" />
          </Typography>
        </TabsContent>
        <TabsContent
          value="withdrawal"
          className="flex items-center justify-center pt-16"
        >
          <div className={cn("wallet-icons")}>
            {/* Add your wallet icons here */}
            <div style={{ marginTop: "15px" }}>
              <TonConnectButton className={cn("connect-wallet")} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Wallet;
