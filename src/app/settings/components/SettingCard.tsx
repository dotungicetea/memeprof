import { IconType } from "@/assets/icons";
import { Box } from "@/components/Box";
import Icon from "@/components/Icon";
import { Typography } from "@/components/Typography";

import classnames from "classnames/bind";
import styles from "./SettingCard.module.scss";
import RippleBase from "@/components/RippleBase";
const cn = classnames.bind(styles);

type Props = {
  icon: IconType;
  description: string;
  className?: string;
  onClick?: () => void;
};

const SettingCard = ({ icon, description, className, onClick }: Props) => {
  return (
    <RippleBase
      onClick={onClick}
      disableRipple={!onClick}
      className={cn("setting__card")}
    >
      <Box className={cn("setting__content")}>
        <span className={cn("setting__icon-container", className)}>
          <Icon
            icon={icon}
            size="sm"
            color="text"
            className={cn("setting__icon")}
          />
        </span>
        <Typography fontSize="md">{description}</Typography>
      </Box>
    </RippleBase>
  );
};

export default SettingCard;
