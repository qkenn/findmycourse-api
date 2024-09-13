/*
  Warnings:

  - You are about to drop the `_StreamToSubject` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `streamId` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectId` to the `SubjectArea` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_StreamToSubject" DROP CONSTRAINT "_StreamToSubject_A_fkey";

-- DropForeignKey
ALTER TABLE "_StreamToSubject" DROP CONSTRAINT "_StreamToSubject_B_fkey";

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "streamId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SubjectArea" ADD COLUMN     "subjectId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_StreamToSubject";

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "Stream"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
