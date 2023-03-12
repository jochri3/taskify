-- CreateTable
CREATE TABLE "contacts" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone_number" VARCHAR(20) NOT NULL,
    "company_name" VARCHAR(30) NOT NULL,
    "position" VARCHAR(100) NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);
