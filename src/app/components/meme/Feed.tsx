"use client";

import classnames from "classnames/bind";
import styles from "./Feed.module.scss";
const cn = classnames.bind(styles);

import BackButton from "@/components/BackButton";
import { useRouter } from "next/navigation";
import MemeFilters from "./components/MemeFilters";
import { MemeList } from "./components/MemeList";
import { Typography } from "@/components/Typography";

const Feed = () => {
  const router = useRouter();

  return (
    <div className={cn("meme")}>
      <BackButton isBackable onClick={() => router.push("/")} />
      <Typography variant="h4" className="pl-2">
        Memes
      </Typography>
      <MemeFilters />
      <MemeList />
    </div>
  );
};

export default Feed;
