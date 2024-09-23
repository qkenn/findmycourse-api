/*
  Warnings:

  - You are about to drop the column `subjectAreaId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `UniversityProgramme` table. All the data in the column will be lost.
  - You are about to drop the `SubjectArea` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[universityId,courseId]` on the table `UniversityProgramme` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `subjectId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `UniversityProgramme` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_subjectAreaId_fkey";

-- DropForeignKey
ALTER TABLE "UniversityProgramme" DROP CONSTRAINT "UniversityProgramme_subjectId_fkey";

-- DropIndex
DROP INDEX "UniversityProgramme_universityId_subjectId_key";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "subjectAreaId",
ADD COLUMN     "subjectId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UniversityProgramme" DROP COLUMN "subjectId",
ADD COLUMN     "courseId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "SubjectArea";

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UniversityProgramme_universityId_courseId_key" ON "UniversityProgramme"("universityId", "courseId");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UniversityProgramme" ADD CONSTRAINT "UniversityProgramme_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
