import { Box } from "@/components/Box";
import { prisma } from "@/utils/prisma";
import { User } from "@prisma/client";
import LeaderBoard from "./components/LeaderBoard";

export const dynamic = "force-dynamic";

const Referrals = async () => {
  const topPointUsers = (await prisma.$queryRaw`
  SELECT u.*, SUM(p.amount) as "totalPoints"
  FROM "User" u
  JOIN "Point" p ON u.id = p."userId"
  GROUP BY u.id
  ORDER BY "totalPoints" DESC
  LIMIT 10
`) as (User & {
    totalPoints: bigint;
  })[];

  return (
    <Box>
      <LeaderBoard
        TopPointUsers={topPointUsers.map((u) => ({
          ...u,
          totalPoints: Number(u.totalPoints),
        }))}
      />
    </Box>
  );
};

export default Referrals;
