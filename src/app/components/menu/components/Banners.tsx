import Banner from "./Banner";
import { prisma } from "@/utils/prisma";

export const dynamic = "force-dynamic";

const Banners = async () => {
  const games = await prisma?.game.findMany({
    where: {
      enabled: true,
    },
  });

  return <Banner data={games} />;
};

export default Banners;
