import GlobalLocker from "@/packages/mini-app/components/global-locker/GlobalLocker";
import TelegramThemeProvider from "@/themes/TelegramThemeProvider";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import classNames from "classnames/bind";
import { Black_Ops_One, Public_Sans } from "next/font/google";
import Script from "next/script";
import NextTopLoader from "nextjs-toploader";
import { Suspense } from "react";
import Initial from "../components/Initial";
import { messages } from "../locale";
import "../styles/globals.scss";
import styles from "./Layout.module.scss";
import ProtectedBar from "./components/ProtectedBar";
import { palette } from "./constants";
import TonConnectUIProviderElement from "./TonConnectUIProviderElement";
import MenuHeader from "./components/menu/components/MenuHeader";

const cn = classNames.bind(styles);

declare global {
  namespace FormatjsIntl {
    interface Message {
      ids: keyof (typeof messages)["en"];
    }
  }
  type Nullable<T> = T | null | undefined;
  type Coords<T = number> = {
    lat: T;
    lng: T;
    addressName?: string;
  };
  type Color =
    | "button-text"
    | "header-bg"
    | "bg"
    | "secondary-bg"
    | "accent-text"
    | "section-bg"
    | "section-header-text"
    | "subtitle-text"
    | "destructive-text"
    | "button"
    | "link"
    | "text"
    | "hint";
}

export const roboto = Public_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-public-sans",
});

export const blackOpsOne = Black_Ops_One({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-black-ops-one",
});

export const metadata = {
  title: "MemeProf",
  description: "Developed by",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${blackOpsOne.variable}`}>
        <TelegramThemeProvider>
          <Theme>
            <TonConnectUIProviderElement>
              <main className={cn("root")}>
                <div className={cn("root__pattern")}>
                  <MenuHeader />
                  {children}
                </div>
                <ProtectedBar />
              </main>
            </TonConnectUIProviderElement>
          </Theme>

          <Script
            src="https://telegram.org/js/telegram-web-app.js"
            strategy="beforeInteractive"
          />
          <Suspense>
            <Initial />
          </Suspense>
          <GlobalLocker />

          <NextTopLoader color={palette.dark.secondary} showSpinner={false} />
        </TelegramThemeProvider>
      </body>
    </html>
  );
}
