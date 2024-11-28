/*
  Warnings:

  - You are about to drop the column `status` on the `ContestTask` table. All the data in the column will be lost.
  - You are about to drop the column `contestId` on the `PendingReward` table. All the data in the column will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PendingRewardStatus" ADD VALUE 'IN_REVIEW';
ALTER TYPE "PendingRewardStatus" ADD VALUE 'COMPLETED';

-- DropForeignKey
ALTER TABLE "PendingReward" DROP CONSTRAINT "PendingReward_contestId_fkey";

-- AlterTable
ALTER TABLE "ContestTask" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "PendingReward" DROP COLUMN "contestId",
ADD COLUMN     "taskId" TEXT;

-- DropEnum
DROP TYPE "TaskStatus";

-- AddForeignKey
ALTER TABLE "PendingReward" ADD CONSTRAINT "PendingReward_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "ContestTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;
