import { prisma } from "@/utils/prisma";
import classnames from "classnames/bind";
import MemeHeader from "../../memes/components/MemeHeader";
import styles from "./MemeDetails.module.scss";
import Meme from "./components/Meme";
import TgActions from "./components/TgActions";

const cn = classnames.bind(styles);

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const dynamic = "force-dynamic";

export default async function Page({ params, searchParams }: Props) {
  const memeId = params.id;

  const meme = await prisma.meme.findUnique({
    where: {
      id: memeId,
    },
    select: {
      id: true,
      caption: true,
      url: true,
      likes: true,
      isPublished: true,
      createdBy: {
        select: {
          firstName: true,
          lastName: true,
          followers: {
            select: {
              id: true,
            },
          },
        },
      },
      createdById: true,
    },
  });

  return (
    <div className={cn("meme-card")}>
      <MemeHeader
        firstName={meme?.createdBy?.firstName}
        lastName={meme?.createdBy?.lastName}
        userId={meme?.createdById?.toString()}
        creator={meme?.createdBy}
      />
      <Meme
        url={meme?.url!}
        likes={meme?.likes!}
        id={meme?.id!}
        caption={meme?.caption!}
        isPublished={meme?.isPublished!}
        createdById={meme?.createdById!}
      />
      <TgActions />
    </div>
  );
}
