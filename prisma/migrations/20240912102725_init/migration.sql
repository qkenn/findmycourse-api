/*
  Warnings:

  - You are about to drop the column `address` on the `University` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `University` table. All the data in the column will be lost.
  - You are about to drop the `Unicourse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Unicourse" DROP CONSTRAINT "Unicourse_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "Unicourse" DROP CONSTRAINT "Unicourse_universityId_fkey";

-- AlterTable
ALTER TABLE "University" DROP COLUMN "address",
DROP COLUMN "city",
ADD COLUMN     "location" TEXT;

-- DropTable
DROP TABLE "Unicourse";

-- CreateTable
CREATE TABLE "UniversityCourse" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "universityId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,

    CONSTRAINT "UniversityCourse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UniversityCourse_universityId_subjectId_key" ON "UniversityCourse"("universityId", "subjectId");

-- AddForeignKey
ALTER TABLE "UniversityCourse" ADD CONSTRAINT "UniversityCourse_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UniversityCourse" ADD CONSTRAINT "UniversityCourse_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
