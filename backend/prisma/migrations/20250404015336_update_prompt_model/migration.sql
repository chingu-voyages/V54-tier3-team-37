-- CreateEnum
CREATE TYPE "Language" AS ENUM ('EN', 'ES', 'FR');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "displayName" VARCHAR(32) NOT NULL,
    "imageUrl" VARCHAR(255),
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prompts" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "role" VARCHAR(256) NOT NULL,
    "context" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "constraints" TEXT NOT NULL,
    "language" "Language" NOT NULL DEFAULT 'EN',
    "score" INTEGER NOT NULL DEFAULT 0,
    "geminiText" TEXT,
    "geminiSummary" TEXT,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prompts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "prompts_userId_idx" ON "prompts"("userId");

-- AddForeignKey
ALTER TABLE "prompts" ADD CONSTRAINT "prompts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
