-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('CUSTOM', 'MEME_GEN', 'SUBSCRIPTION', 'REFERRAL', 'GAME');

-- AlterTable
ALTER TABLE "ContestTask" ADD COLUMN     "details" TEXT,
ADD COLUMN     "payload" TEXT,
ADD COLUMN     "type" "TaskType" NOT NULL DEFAULT 'SUBSCRIPTION',
ADD COLUMN     "url" TEXT;
