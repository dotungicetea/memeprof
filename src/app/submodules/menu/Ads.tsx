import AdsSlider from "@/app/components/menu/components/AdsSlider";
import { prisma } from "@/utils/prisma";

export const dynamic = "force-dynamic";

const Ads = async () => {
  const ads = await prisma.ad.findMany({
    where: {
      enabled: true,
    },
  });

  return <AdsSlider ads={ads} />;
};

export default Ads;
