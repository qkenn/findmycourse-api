/*
  Warnings:

  - You are about to drop the column `location` on the `University` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "University" DROP COLUMN "location",
ADD COLUMN     "city" TEXT;
