-- CreateTable
CREATE TABLE "patients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cpf" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "bithday" DATETIME NOT NULL,
    "sugery_date" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "patientData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "measurement_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "score" INTEGER NOT NULL,
    "pacient_id" TEXT NOT NULL,
    "physio_coffito" TEXT NOT NULL,
    CONSTRAINT "patientData_pacient_id_fkey" FOREIGN KEY ("pacient_id") REFERENCES "patients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "patientData_physio_coffito_fkey" FOREIGN KEY ("physio_coffito") REFERENCES "physiotherapists" ("coffito") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "physiotherapists" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "coffito" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "patients_cpf_key" ON "patients"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "physiotherapists_coffito_key" ON "physiotherapists"("coffito");
