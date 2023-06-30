/*
  Warnings:

  - You are about to drop the `Staff` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "staff_sessions";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "staff_sessions";

-- DropTable
DROP TABLE "Staff";

-- CreateTable
CREATE TABLE "Receptionist" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Receptionist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Receptionist_username_key" ON "Receptionist"("username");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "receptionist_sessions" FOREIGN KEY ("userId") REFERENCES "Receptionist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "receptionist_sessions" FOREIGN KEY ("userId") REFERENCES "Receptionist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
