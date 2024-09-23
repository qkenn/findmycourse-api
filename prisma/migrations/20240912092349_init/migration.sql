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
CREATE TABLE "Unicourse" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "universityId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,

    CONSTRAINT "Unicourse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Unicourse_universityId_subjectId_key" ON "Unicourse"("universityId", "subjectId");

-- AddForeignKey
ALTER TABLE "Unicourse" ADD CONSTRAINT "Unicourse_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unicourse" ADD CONSTRAINT "Unicourse_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
