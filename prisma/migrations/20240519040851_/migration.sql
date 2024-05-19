-- CreateTable
CREATE TABLE "tr_token" (
    "id" SERIAL NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "expiredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tr_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tr_token_token_key" ON "tr_token"("token");
