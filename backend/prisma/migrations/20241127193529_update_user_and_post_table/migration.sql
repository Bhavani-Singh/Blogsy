/*
  Warnings:

  - Added the required column `createdAt` to the `Bpost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `about` to the `Buser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bpost" ADD COLUMN     "createdAt" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Buser" ADD COLUMN     "about" TEXT NOT NULL;
