/*
  Warnings:

  - You are about to drop the column `streamId` on the `Subject` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_streamId_fkey";

-- AlterTable
ALTER TABLE "Stream" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "streamId";

-- CreateTable
CREATE TABLE "_StreamToSubject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_StreamToSubject_AB_unique" ON "_StreamToSubject"("A", "B");

-- CreateIndex
CREATE INDEX "_StreamToSubject_B_index" ON "_StreamToSubject"("B");

-- AddForeignKey
ALTER TABLE "_StreamToSubject" ADD CONSTRAINT "_StreamToSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "Stream"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StreamToSubject" ADD CONSTRAINT "_StreamToSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
