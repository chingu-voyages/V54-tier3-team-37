-- AlterTable
ALTER TABLE "users" ADD COLUMN     "imageUrl" VARCHAR(255);

-- CreateTable
CREATE TABLE "prompt_outputs" (
    "id" UUID NOT NULL,
    "promptId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "metadata" JSONB,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prompt_outputs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "prompt_outputs" ADD CONSTRAINT "prompt_outputs_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "prompts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prompt_outputs" ADD CONSTRAINT "prompt_outputs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
