-- AlterTable
ALTER TABLE "Ad" ADD COLUMN     "actionButtonText" TEXT DEFAULT 'READ MORE',
ADD COLUMN     "enabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "icon" TEXT;

-- CreateTable
CREATE TABLE "Announcement" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT,
    "description" TEXT,
    "imageUrl" TEXT,
    "variant" TEXT NOT NULL DEFAULT 'default',
    "icon" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "actionButtonText" TEXT DEFAULT 'Read',
    "background" TEXT DEFAULT 'linear-gradient(to right, #ffd194, #efb832)',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);
