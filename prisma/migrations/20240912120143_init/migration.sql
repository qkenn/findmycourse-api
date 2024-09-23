/*
  Warnings:

  - You are about to drop the column `keywords` on the `Subject` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "keywords",
ADD COLUMN     "code" INTEGER,
ADD COLUMN     "intake" INTEGER;

-- AlterTable
ALTER TABLE "UniversityCourse" ADD COLUMN     "duration" TEXT,
ADD COLUMN     "keywords" TEXT[],
ADD COLUMN     "medium" TEXT,
ADD COLUMN     "uniCode" TEXT;
