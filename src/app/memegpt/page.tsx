import { prisma } from "@/utils/prisma";
import { Contest, ContestTask } from "@prisma/client";
import MemeGPT from "./components/MemeGPT";

type Props = {
  searchParams: {
    contestId: string;
    taskId: string;
  };
};

export const dynamic = "force-dynamic";

const MemeGPTPage = async ({ searchParams }: Props) => {
  let contest: Nullable<Contest> = null;
  let task: Nullable<ContestTask> = null;

  if (searchParams?.contestId && searchParams?.taskId) {
    contest = await prisma?.contest.findUnique({
      where: {
        id: searchParams.contestId,
      },
    });

    task = await prisma?.contestTask.findUnique({
      where: {
        id: searchParams.taskId,
      },
    });
  }

  return <MemeGPT contest={contest} task={task} />;
};

export default MemeGPTPage;
