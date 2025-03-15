-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prompts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL DEFAULT 'Untitled',
    "persona" VARCHAR(256) NOT NULL,
    "context" VARCHAR(256) NOT NULL,
    "task" VARCHAR(256) NOT NULL,
    "output" VARCHAR(256) NOT NULL,
    "constraints" VARCHAR(256) NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "isBookmarked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prompts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "prompts_userId_idx" ON "prompts"("userId");

-- AddForeignKey
ALTER TABLE "prompts" ADD CONSTRAINT "prompts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
