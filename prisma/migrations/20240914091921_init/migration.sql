/*
  Warnings:

  - You are about to drop the `Subject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_streamId_fkey";

-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_subjectAreaId_fkey";

-- DropForeignKey
ALTER TABLE "UniversityProgramme" DROP CONSTRAINT "UniversityProgramme_subjectId_fkey";

-- DropTable
DROP TABLE "Subject";

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "code" TEXT,
    "intake" INTEGER,
    "name" TEXT NOT NULL,
    "constraints" JSONB,
    "subjectAreaId" INTEGER,
    "streamId" INTEGER NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_code_key" ON "Course"("code");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_subjectAreaId_fkey" FOREIGN KEY ("subjectAreaId") REFERENCES "SubjectArea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "Stream"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UniversityProgramme" ADD CONSTRAINT "UniversityProgramme_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
