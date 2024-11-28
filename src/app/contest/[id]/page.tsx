import { PointReasons } from "@/app/lib/constants";
import { Box } from "@/components/Box";
import { prisma } from "@/utils/prisma";
import { PendingRewardStatus } from "@prisma/client";
import ContestDetails from "./components/ContestDetails";

type Props = {
  params: {
    id: string;
  };
  searchParams: Record<string, string>;
};

const ContestIdPage = async (props: Props) => {
  const contest = await prisma.contest.findUnique({
    where: {
      id: props.params.id,
    },
    include: {
      contestTaskSets: {
        include: {
          tasks: {
            include: {
              pendingRewards: {
                where: {
                  userId: props.searchParams?.userId,
                },
              },
            },
          },
        },
      },
    },
  });

  if (
    contest?.contestTaskSets?.every((contestTaskSet) =>
      contestTaskSet.tasks.every((task) =>
        task.pendingRewards?.every(
          (reward) => reward.status === PendingRewardStatus.CLAIMED
        )
      )
    )
  ) {
    try {
      const currentContest = await prisma.contest.findUnique({
        where: {
          id: contest?.id,
        },
      });

      const tasksToComplete = await prisma.contestTask.findMany({
        where: {
          contestTaskSet: {
            contestId: contest?.id,
          },

          pendingRewards: {
            some: {
              status: {
                not: PendingRewardStatus.CLAIMED,
              },
              userId: props.searchParams?.userId,
            },
          },
        },
      });

      if (!tasksToComplete.length) {
        const existingReward = await prisma.point.findUnique({
          where: {
            id: `${PointReasons.CONTEST}-${contest?.id}-${props.searchParams?.userId}`,
            pointReason: PointReasons.CONTEST,
          },
        });

        if (!existingReward) {
          await prisma.point.create({
            data: {
              id: `${PointReasons.CONTEST}-${contest?.id}-${props.searchParams?.userId}`,
              userId: props.searchParams?.userId,
              amount: currentContest?.rewardAmount,
              pointReason: PointReasons.CONTEST,
            },
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box>
      <ContestDetails {...contest!} />
    </Box>
  );
};

export default ContestIdPage;
