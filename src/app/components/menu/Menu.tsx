"use client";

import useBackButton from "@/components/BackButton/useBackButton";
import classNames from "classnames/bind";
import { type FC } from "react";
import Feed from "../meme/Feed";
import styles from "./Menu.module.scss";

const cn = classNames.bind(styles);

type MenuProps = {
  children: React.ReactNode;
  banner?: React.ReactNode;
};

const Menu: FC<MenuProps> = ({ children, banner }) => {
  useBackButton({
    isBackable: false,
  });

  return (
    <div className={cn("menu-container")}>
      {/* <Joyride
        steps={steps}
        styles={{
          options: {
            arrowColor: "#2a2a2a",
            backgroundColor: "#2a2a2a",
            // overlayColor: "rgba(79, 26, 0, 0.4)",
            // primaryColor: "#000",
            // textColor: "#004a14",
            width: 900,
            zIndex: 1000,
          },
        }}
      /> */}

      {banner}

      <Feed />
    </div>
  );
};

export default Menu;
