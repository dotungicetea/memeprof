"use client";

import { Box } from "@/components/Box";
import IconButton from "@/components/IconButton";
import classNames from "classnames/bind";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import styles from "./bottom-navigation.module.scss";

const cn = classNames.bind(styles);

type Props = {};

const BottomNavigation = (props: Props) => {
  const segment = useSelectedLayoutSegment();

  return (
    <Box className={cn("bottom-navigation")}>
      <Box className={cn("bottom-navigation__wrapper")}>
        <Link
          href="/menu"
          className={cn("bottom-navigation__link", {
            "bottom-navigation__link--active": segment === "menu" || !segment,
          })}
        >
          <IconButton
            icon="navigation/home"
            onClick={() => {}}
            className={cn("bottom-navigation__icon", {
              "bottom-navigation__icon--active": segment === "menu" || !segment,
            })}
          />
          Home
        </Link>
        <Link
          href="/games"
          className={cn("bottom-navigation__link", {
            "bottom-navigation__link--active": segment === "games",
          })}
        >
          <IconButton
            icon="navigation/games"
            onClick={() => {}}
            className={cn("bottom-navigation__icon", {
              "bottom-navigation__icon--active": segment === "games",
            })}
          />
          games
        </Link>
        <Link
          href="/referrals"
          className={cn("bottom-navigation__link", {
            "bottom-navigation__link--active": segment === "referrals",
          })}
        >
          <IconButton
            icon="navigation/friends"
            onClick={() => {}}
            className={cn("bottom-navigation__icon", {
              "bottom-navigation__icon--active": segment === "referrals",
            })}
          />
          friends
        </Link>
        <Link
          href="/memegpt"
          className={cn("bottom-navigation__link", {
            "bottom-navigation__link--active": segment === "memegpt",
          })}
        >
          <IconButton
            icon="navigation/memegpt"
            onClick={() => {}}
            className={cn("bottom-navigation__icon", {
              "bottom-navigation__icon--active": segment === "memegpt",
            })}
          />
          memeGPT
        </Link>

        <Link
          href="/contest"
          className={cn("bottom-navigation__link", {
            "bottom-navigation__link--active": segment === "contest",
          })}
        >
          <IconButton
            icon="navigation/quest"
            onClick={() => {}}
            className={cn("bottom-navigation__icon", {
              "bottom-navigation__icon--active": segment === "contest",
            })}
          />
          quest
        </Link>
        <Link
          href="/trending"
          className={cn("bottom-navigation__link", {
            "bottom-navigation__link--active": segment === "trending",
          })}
        >
          <IconButton
            icon="navigation/trending"
            onClick={() => {}}
            className={cn("bottom-navigation__icon", {
              "bottom-navigation__icon--active": segment === "trending",
            })}
          />
          Trending
        </Link>
      </Box>
    </Box>
  );
};

export default BottomNavigation;
