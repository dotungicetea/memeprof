import { Typography } from "../Typography";

import classnames from "classnames/bind";
import styles from "./Header.module.scss";
const cn = classnames.bind(styles);

type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  return (
    <div className={cn("menu")}>
      <div className={cn("menu__header")}>
        <Typography className={cn("menu__title")}>{title}</Typography>
      </div>
    </div>
  );
};

export default Header;
