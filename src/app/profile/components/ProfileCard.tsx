import { Box } from "@/components/Box";
import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProfileCard.module.scss";

type ProfileCardProps = {
  id: string;
  url: string;
  caption?: string | null;
};

const cn = classNames.bind(styles);

const ProfileCard = ({ id, url, caption }: ProfileCardProps) => {
  return (
    <Link href={`/meme/${id}`} className={cn("meme")}>
      <Box className={cn("meme__image")}>
        <Image src={url} alt={caption || ""} fill />
      </Box>
    </Link>
  );
};

export default ProfileCard;
