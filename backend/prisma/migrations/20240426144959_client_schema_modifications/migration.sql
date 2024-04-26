/*
  Warnings:

  - The primary key for the `clients` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `admin` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `antecipations` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `cnpj` on table `clients` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "role_enum" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "TaxRegimeEnum" AS ENUM ('microeemprendedor_individual', 'simples_nacional', 'lucro_presumido', 'lucro_real');

-- DropForeignKey
ALTER TABLE "antecipations" DROP CONSTRAINT "antecipations_clientId_fkey";

-- AlterTable
ALTER TABLE "clients" DROP CONSTRAINT "clients_pkey",
ADD COLUMN     "taxRegime" "TaxRegimeEnum",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "cnpj" SET NOT NULL,
ADD CONSTRAINT "clients_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "clients_id_seq";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "admin",
ADD COLUMN     "role" "role_enum" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "antecipations";
