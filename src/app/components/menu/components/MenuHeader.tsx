"use client";

import { Box } from "@/components/Box";
import IconButton from "@/components/IconButton";
import RippleBase from "@/components/RippleBase";
import { Typography } from "@/components/Typography";
import classNames from "classnames/bind";
import Link from "next/link";
import styles from "./MenuHeader.module.scss";
import Button from "@/components/Button";
import { usePathname } from "next/navigation";

const cn = classNames.bind(styles);
const exceptions = ["/verification", "/games/"];

const headerTitles = {
  "/": "Explore collections",
  "/profile": "Profile",
  "/airdrop": "Airdrop",
  "/memegpt": "MemeGPT",
  "/contest": "Quest",
};

const MenuHeader = () => {
  const pathname = usePathname();

  if (exceptions.some((exception) => pathname?.includes(exception))) {
    return null;
  }

  return (
    <Box className={cn("menu-header")}>
      <Link href="/profile">
        <RippleBase className={cn("menu-header__profile")} onClick={() => {}}>
          <IconButton
            icon="logoProfile"
            onClick={() => {}}
            className={cn("menu-header__profile-icon")}
          />
        </RippleBase>
      </Link>

      <Typography
        variant="button"
        className="text-center whitespace-nowrap mx-auto"
      >
        {/* @ts-ignore */}
        {headerTitles[pathname!] || headerTitles["/"]}
      </Typography>

      <Link href="/airdrop">
        <Button variant="contained" className="!rounded-full text-sm">
          Airdrop
        </Button>
      </Link>
    </Box>
  );
};

export default MenuHeader;
