/*
  Warnings:

  - The primary key for the `Like` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Meme` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `academicStatus` on the `Meme` table. All the data in the column will be lost.
  - The primary key for the `Point` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- CreateEnum
CREATE TYPE "Level" AS ENUM ('NOOB', 'GRIFTER', 'PLOTTER', 'WHEELMAN', 'HACKER', 'CRYPTOLOGIST', 'PHANTOM', 'INFILTRATOR', 'SAFECRACKER', 'MAESTRO', 'THE_PROFESSOR');

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_memeId_fkey";

-- DropForeignKey
ALTER TABLE "_Favorites" DROP CONSTRAINT "_Favorites_A_fkey";

-- AlterTable
ALTER TABLE "Like" DROP CONSTRAINT "Like_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "memeId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Like_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Like_id_seq";

-- AlterTable
ALTER TABLE "Meme" DROP CONSTRAINT "Meme_pkey",
DROP COLUMN "academicStatus",
ADD COLUMN     "hidden" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "level" "Level" NOT NULL DEFAULT 'NOOB',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Meme_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Meme_id_seq";

-- AlterTable
ALTER TABLE "Point" DROP CONSTRAINT "Point_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Point_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Point_id_seq";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "level" "Level" NOT NULL DEFAULT 'NOOB';

-- AlterTable
ALTER TABLE "_Favorites" ALTER COLUMN "A" SET DATA TYPE TEXT;

-- DropEnum
DROP TYPE "AcademicStatus";

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_memeId_fkey" FOREIGN KEY ("memeId") REFERENCES "Meme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Favorites" ADD CONSTRAINT "_Favorites_A_fkey" FOREIGN KEY ("A") REFERENCES "Meme"("id") ON DELETE CASCADE ON UPDATE CASCADE;
