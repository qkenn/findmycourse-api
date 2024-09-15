/*
  Warnings:

  - A unique constraint covering the columns `[universityId,courseId]` on the table `Programme` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Programme_uniCode_key";

-- CreateIndex
CREATE UNIQUE INDEX "Programme_universityId_courseId_key" ON "Programme"("universityId", "courseId");
