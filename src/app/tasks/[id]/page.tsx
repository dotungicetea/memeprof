import { prisma } from "@/utils/prisma";
import TaskDetails from "./components/TaskDetails";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const Task = async ({ params, searchParams }: Props) => {
  const taskId = params.id;

  const task = await prisma.verification.findUnique({
    where: {
      id: taskId,
    },
    select: {
      title: true,
      shortDescription: true,
      description: true,
      icon: true,
      url: true,
      payload: true,
      rewardAmount: true,
    },
  });

  return (
    <TaskDetails
      shortDescription={task?.shortDescription!}
      description={task?.description!}
      icon={task?.icon!}
      url={task?.url!}
      payload={task?.payload}
      rewardAmount={task?.rewardAmount!}
    />
  );
};

export default Task;
