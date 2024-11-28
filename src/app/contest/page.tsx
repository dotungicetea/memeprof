import Contests from "./components/Contests";
import { prisma } from "@/utils/prisma";

export const dynamic = "force-dynamic";

const ContestPage = async () => {
  const contests = await prisma.contest.findMany({
    where: {
      enabled: true,
    },
    orderBy: {
      startDate: "asc",
    },
    include: {
      contestTaskSets: {
        include: {
          tasks: true,
        },
      },
    },
  });

  return <Contests contests={contests} />;
};

export default ContestPage;
