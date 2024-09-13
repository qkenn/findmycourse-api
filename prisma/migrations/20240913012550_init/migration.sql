/*
  Warnings:

  - You are about to drop the `UniversityCourse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UniversityCourse" DROP CONSTRAINT "UniversityCourse_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "UniversityCourse" DROP CONSTRAINT "UniversityCourse_universityId_fkey";

-- DropTable
DROP TABLE "UniversityCourse";

-- CreateTable
CREATE TABLE "UniversityProgramme" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "universityId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "keywords" TEXT[],
    "duration" TEXT DEFAULT '4 Years',
    "medium" TEXT DEFAULT 'English',
    "uniCode" TEXT,

    CONSTRAINT "UniversityProgramme_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UniversityProgramme_uniCode_key" ON "UniversityProgramme"("uniCode");

-- CreateIndex
CREATE UNIQUE INDEX "UniversityProgramme_universityId_subjectId_key" ON "UniversityProgramme"("universityId", "subjectId");

-- AddForeignKey
ALTER TABLE "UniversityProgramme" ADD CONSTRAINT "UniversityProgramme_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UniversityProgramme" ADD CONSTRAINT "UniversityProgramme_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
