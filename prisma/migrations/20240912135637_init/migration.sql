-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "subjectAreaId" INTEGER;

-- CreateTable
CREATE TABLE "SubjectArea" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SubjectArea_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_subjectAreaId_fkey" FOREIGN KEY ("subjectAreaId") REFERENCES "SubjectArea"("id") ON DELETE SET NULL ON UPDATE CASCADE;
