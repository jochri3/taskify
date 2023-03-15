-- CreateEnum
CREATE TYPE "auth"."roles" AS ENUM ('Regular', 'Admin');

-- AlterTable
ALTER TABLE "auth"."users" ADD COLUMN     "role" "auth"."roles" NOT NULL DEFAULT 'Regular';
