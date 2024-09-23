/*
  Warnings:

  - You are about to drop the `UniversityProgramme` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UniversityProgramme" DROP CONSTRAINT "UniversityProgramme_courseId_fkey";

-- DropForeignKey
ALTER TABLE "UniversityProgramme" DROP CONSTRAINT "UniversityProgramme_universityId_fkey";

-- DropTable
DROP TABLE "UniversityProgramme";

-- CreateTable
CREATE TABLE "Programme" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "abbr" TEXT,
    "universityId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "keywords" TEXT[],
    "duration" TEXT DEFAULT '4 Years',
    "medium" TEXT DEFAULT 'English',
    "uniCode" TEXT,

    CONSTRAINT "Programme_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Programme_uniCode_key" ON "Programme"("uniCode");

-- CreateIndex
CREATE UNIQUE INDEX "Programme_universityId_courseId_key" ON "Programme"("universityId", "courseId");

-- AddForeignKey
ALTER TABLE "Programme" ADD CONSTRAINT "Programme_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Programme" ADD CONSTRAINT "Programme_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
