-- CreateTable
CREATE TABLE "ms_user" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ms_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tr_user_geodata" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "geoJson" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tr_user_geodata_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tr_user_geodata" ADD CONSTRAINT "tr_user_geodata_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ms_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
