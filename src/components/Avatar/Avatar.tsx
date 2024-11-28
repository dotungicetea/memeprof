import * as RAvatar from "@radix-ui/react-avatar";
import classNames from "classnames/bind";
import React, { FC } from "react";
import styles from "./avatar.module.scss";

const cn = classNames.bind(styles);

type Props = {
  className?: string;
  size?: "sm" | "md" | "lg";
  url?: string;
  name?: string;
};

const Avatar: FC<Props> = ({ className, size = "md", url, name }) => {
  const child = url ? (
    <RAvatar.Image
      className={cn("avatar__img")}
      src={url}
      alt="MemeProf avatar"
    />
  ) : (
    <RAvatar.Fallback className={cn("avatar__fallback")} delayMs={600}>
      {name?.split(" ").map((n) => n[0])}
    </RAvatar.Fallback>
  );

  return (
    <RAvatar.Root className={cn("avatar", `avatar--${size}`, className)}>
      {child}
    </RAvatar.Root>
  );
};

export default Avatar;
