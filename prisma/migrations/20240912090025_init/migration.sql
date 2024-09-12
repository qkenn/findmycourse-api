/*
  Warnings:

  - You are about to drop the column `courseId` on the `UniversityCourse` table. All the data in the column will be lost.
  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[universityId,subjectId]` on the table `UniversityCourse` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `subjectId` to the `UniversityCourse` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UniversityCourse" DROP CONSTRAINT "UniversityCourse_courseId_fkey";

-- DropIndex
DROP INDEX "UniversityCourse_universityId_courseId_key";

-- AlterTable
ALTER TABLE "UniversityCourse" DROP COLUMN "courseId",
ADD COLUMN     "subjectId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Course";

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "keywords" TEXT[],

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UniversityCourse_universityId_subjectId_key" ON "UniversityCourse"("universityId", "subjectId");

-- AddForeignKey
ALTER TABLE "UniversityCourse" ADD CONSTRAINT "UniversityCourse_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
