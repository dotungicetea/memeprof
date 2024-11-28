import Sticker from "@/components/Sticker";
import { Typography } from "@/components/Typography";

import styles from "./Notmeme.module.scss";
import classnames from "classnames/bind";
const cn = classnames.bind(styles);

const NotMeme = () => {
  return (
    <div className={cn("notmeme")}>
      <div className={cn("notmeme__container")}>
        <div className={cn("notmeme__content")}>
          <Typography
            align="center"
            fontSize="sm"
            className={cn("notmeme__heading")}
          >
            No memes here yet...
          </Typography>
          <Typography className={cn("notmeme__text")} align="center">
            Send a prompt to create a meme
          </Typography>
        </div>
        <Sticker name="leaders" width={100} height={100} />
      </div>
    </div>
  );
};

export default NotMeme;
