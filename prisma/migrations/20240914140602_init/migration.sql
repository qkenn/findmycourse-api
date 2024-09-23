/*
  Warnings:

  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Programme` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `University` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "Programme" DROP CONSTRAINT "Programme_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Programme" DROP CONSTRAINT "Programme_universityId_fkey";

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "Programme";

-- DropTable
DROP TABLE "Subject";

-- DropTable
DROP TABLE "University";

-- CreateTable
CREATE TABLE "Post" (
    "Id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("Id")
);
