/*
  Warnings:

  - You are about to drop the `carros` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `clientes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `carros`;

-- DropTable
DROP TABLE `clientes`;

-- CreateTable
CREATE TABLE `Carro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `placa` VARCHAR(191) NOT NULL,
    `marca` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `ano` INTEGER NOT NULL,

    UNIQUE INDEX `Carro_placa_key`(`placa`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `cnh` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Cliente_cpf_key`(`cpf`),
    UNIQUE INDEX `Cliente_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
