/*
  Warnings:

  - You are about to drop the column `level` on the `Meme` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "LinkVariant" AS ENUM ('WEB', 'TELEGRAM', 'TELEGRAM_BACKABLE');

-- CreateEnum
CREATE TYPE "FieldType" AS ENUM ('TEXT', 'NUMBER', 'DATE', 'TIME', 'DATETIME', 'SELECT', 'RADIO', 'CHECKBOX', 'FILE', 'IMAGE', 'URL', 'EMAIL', 'PHONE', 'TEXTAREA');

-- CreateEnum
CREATE TYPE "WatermarkPosition" AS ENUM ('TOP_LEFT', 'TOP_RIGHT', 'BOTTOM_LEFT', 'BOTTOM_RIGHT');

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'SUPER_ADMIN';

-- AlterTable
ALTER TABLE "Meme" DROP COLUMN "level";

-- AlterTable
ALTER TABLE "Verification" ADD COLUMN     "enabled" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Contest" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rewardTitle" TEXT NOT NULL,
    "rewardAvatarUrl" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "contentTitle" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isEnded" BOOLEAN NOT NULL DEFAULT false,
    "rewardAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContestTaskSet" (
    "id" TEXT NOT NULL,
    "contestId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContestTaskSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContestTask" (
    "id" TEXT NOT NULL,
    "contestTaskSetId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "hasDetailsPage" BOOLEAN NOT NULL DEFAULT false,
    "linkVariant" "LinkVariant" NOT NULL DEFAULT 'TELEGRAM',
    "hasConfirmationForm" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContestTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContestMemeConfiguration" (
    "id" TEXT NOT NULL,
    "watermarkUrl" TEXT,
    "watermarkSize" DOUBLE PRECISION,
    "watermarkPosition" "WatermarkPosition" NOT NULL DEFAULT 'BOTTOM_RIGHT',
    "prompt" TEXT,
    "imageUrl" TEXT,
    "contestId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContestMemeConfiguration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContestTaskSubmission" (
    "id" TEXT NOT NULL,
    "contestTaskId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "payload" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContestTaskSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContestTaskSubmissionField" (
    "id" TEXT NOT NULL,
    "contestTaskSubmissionId" TEXT NOT NULL,
    "contestTaskFieldId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContestTaskSubmissionField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContestTaskField" (
    "id" TEXT NOT NULL,
    "contestTaskId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "type" "FieldType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContestTaskField_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContestMemeConfiguration_contestId_key" ON "ContestMemeConfiguration"("contestId");

-- AddForeignKey
ALTER TABLE "ContestTaskSet" ADD CONSTRAINT "ContestTaskSet_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContestTask" ADD CONSTRAINT "ContestTask_contestTaskSetId_fkey" FOREIGN KEY ("contestTaskSetId") REFERENCES "ContestTaskSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContestMemeConfiguration" ADD CONSTRAINT "ContestMemeConfiguration_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContestTaskSubmission" ADD CONSTRAINT "ContestTaskSubmission_contestTaskId_fkey" FOREIGN KEY ("contestTaskId") REFERENCES "ContestTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContestTaskSubmission" ADD CONSTRAINT "ContestTaskSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContestTaskSubmissionField" ADD CONSTRAINT "ContestTaskSubmissionField_contestTaskSubmissionId_fkey" FOREIGN KEY ("contestTaskSubmissionId") REFERENCES "ContestTaskSubmission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContestTaskSubmissionField" ADD CONSTRAINT "ContestTaskSubmissionField_contestTaskFieldId_fkey" FOREIGN KEY ("contestTaskFieldId") REFERENCES "ContestTaskField"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContestTaskField" ADD CONSTRAINT "ContestTaskField_contestTaskId_fkey" FOREIGN KEY ("contestTaskId") REFERENCES "ContestTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;
