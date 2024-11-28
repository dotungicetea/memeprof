"use client";

import classNames from "classnames/bind";
import styles from "./MenuCard.module.scss";
import { useRouter } from "next/navigation";
import RippleBase from "@/components/RippleBase";
import Image from "next/image";
import { FormattedMessage } from "react-intl";
import { MessageIds } from "@/locale";
import Link from "next/link";

const cn = classNames.bind(styles);

type MenuCardProps = {
  title: MessageIds;
  path: string;
  icon: string;
  id?: string;
};

const MenuCard = ({ title, path, icon, id }: MenuCardProps) => {
  const router = useRouter();

  return (
    <Link href={path}>
      <RippleBase id={id} onClick={() => {}} className={cn("card__container")}>
        <div className={cn("card")}>
          <div className={cn("card__icon")}>
            <Image src={icon} alt={title} width={24} height={24} />
          </div>
          <p className={cn("card__title")}>
            <FormattedMessage id={title} />
          </p>
        </div>
      </RippleBase>
    </Link>
  );
};

export default MenuCard;
