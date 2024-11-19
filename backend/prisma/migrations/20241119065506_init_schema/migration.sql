-- CreateTable
CREATE TABLE "Buser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Buser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bpost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Bpost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Buser_email_key" ON "Buser"("email");

-- AddForeignKey
ALTER TABLE "Bpost" ADD CONSTRAINT "Bpost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Buser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
