-- CreateEnum
CREATE TYPE "PendingRewardStatus" AS ENUM ('PENDING', 'CLAIMED', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('IDLE', 'CLAIMED', 'PENDING', 'REJECTED', 'APPROVED', 'IN_REVIEW', 'COMPLETED');

-- AlterTable
ALTER TABLE "ContestTask" ADD COLUMN     "status" "TaskStatus" NOT NULL DEFAULT 'IDLE';

-- CreateTable
CREATE TABLE "PendingReward" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "PendingRewardStatus" NOT NULL DEFAULT 'PENDING',
    "contestId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PendingReward_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PendingReward" ADD CONSTRAINT "PendingReward_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PendingReward" ADD CONSTRAINT "PendingReward_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
