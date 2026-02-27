/*
  Warnings:

  - Added the required column `item` to the `Lista` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor` to the `Lista` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `lista` ADD COLUMN `item` VARCHAR(191) NOT NULL,
    ADD COLUMN `valor` DOUBLE NOT NULL;
