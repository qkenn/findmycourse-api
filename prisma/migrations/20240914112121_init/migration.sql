/*
  Warnings:

  - You are about to drop the column `streamId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the `Stream` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_streamId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "streamId";

-- DropTable
DROP TABLE "Stream";
