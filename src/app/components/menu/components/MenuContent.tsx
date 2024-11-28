"use client";

import classNames from "classnames/bind";
import MenuCard from "./MenuCard";
import styles from "./MenuContent.module.scss";

import { MainMenuContent } from "@/app/constants";

const cn = classNames.bind(styles);

const MenuContent = () => {
  return (
    <div className={cn("menu")}>
      <div className={cn("menu__content")}>
        {MainMenuContent.map((item, index) => (
          <MenuCard
            id={item.id}
            title={item.title}
            path={item.href}
            icon={item.icon}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};
export default MenuContent;
