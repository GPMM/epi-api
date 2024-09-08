/*
  Warnings:

  - Added the required column `posX` to the `UnityObject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posY` to the `UnityObject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posZ` to the `UnityObject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UnityObject" ADD COLUMN     "posX" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "posY" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "posZ" DOUBLE PRECISION NOT NULL;
