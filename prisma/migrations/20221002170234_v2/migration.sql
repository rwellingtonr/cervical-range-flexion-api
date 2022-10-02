-- CreateTable
CREATE TABLE "patients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "birthday" DATETIME NOT NULL,
    "surgery_date" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "patientData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "measurement_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "score" INTEGER NOT NULL,
    "patient_id" TEXT,
    "physio_crefito" TEXT,
    CONSTRAINT "patientData_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "patientData_physio_crefito_fkey" FOREIGN KEY ("physio_crefito") REFERENCES "physiotherapists" ("crefito") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "physiotherapists" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "crefito" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "patients_name_key" ON "patients"("name");

-- CreateIndex
CREATE UNIQUE INDEX "patients_cpf_key" ON "patients"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "physiotherapists_crefito_key" ON "physiotherapists"("crefito");
