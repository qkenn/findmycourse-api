/*
  Warnings:

  - The `name` column on the `Stream` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Stream" DROP COLUMN "name",
ADD COLUMN     "name" TEXT[];
