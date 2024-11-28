import { Box } from "@/components/Box";
import Icon from "@/components/Icon";
import Paper from "@/components/Paper";
import RippleBase from "@/components/RippleBase";
import classNames from "classnames/bind";
import Link from "next/link";
import styles from "./game-item.module.scss";

const cn = classNames.bind(styles);

type Props = {
  name: string;
  image: string;
  id: string;
};

const GameItem = ({ name, image, id }: Props) => {
  return (
    <Link href={`/games/${id}`}>
      <RippleBase
        component={Paper}
        onClick={() => {}}
        className={cn("banner")}
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
      >
        <Box className={cn("banner__content")}>
          <Box className={cn("flex gap-2")}>
            <Icon className={cn("banner__icon")} icon="play" />
            {name}
          </Box>
        </Box>
      </RippleBase>
    </Link>
  );
};

export default GameItem;
