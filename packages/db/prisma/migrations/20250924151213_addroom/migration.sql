-- CreateTable
CREATE TABLE "public"."Room" (
    "id" TEXT NOT NULL,
    "roomName" TEXT NOT NULL,
    "roomOwner" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Room" ADD CONSTRAINT "Room_roomOwner_fkey" FOREIGN KEY ("roomOwner") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
