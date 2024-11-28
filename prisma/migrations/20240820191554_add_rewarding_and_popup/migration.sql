-- AlterTable
ALTER TABLE "User" ADD COLUMN     "rewardLastClaimedAt" TIMESTAMP(3),
ADD COLUMN     "rewardRate" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "totalBalance" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Popup" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "payload" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Popup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PopupSeen" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "popupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PopupSeen_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PopupSeen" ADD CONSTRAINT "PopupSeen_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PopupSeen" ADD CONSTRAINT "PopupSeen_popupId_fkey" FOREIGN KEY ("popupId") REFERENCES "Popup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
