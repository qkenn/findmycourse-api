/*
  Warnings:

  - You are about to drop the column `subject` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the `Uni` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "subject",
ADD COLUMN     "study" TEXT;

-- DropTable
DROP TABLE "Uni";

-- CreateTable
CREATE TABLE "University" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT,
    "address" TEXT,

    CONSTRAINT "University_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UniversityCourse" (
    "id" SERIAL NOT NULL,
    "universityId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "UniversityCourse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UniversityCourse_universityId_courseId_key" ON "UniversityCourse"("universityId", "courseId");

-- AddForeignKey
ALTER TABLE "UniversityCourse" ADD CONSTRAINT "UniversityCourse_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UniversityCourse" ADD CONSTRAINT "UniversityCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
