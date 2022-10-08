/*
  Warnings:

  - Added the required column `moviment` to the `patientData` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_physiotherapists" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "crefito" TEXT NOT NULL,
    "isValid" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_physiotherapists" ("crefito", "id", "name", "password") SELECT "crefito", "id", "name", "password" FROM "physiotherapists";
DROP TABLE "physiotherapists";
ALTER TABLE "new_physiotherapists" RENAME TO "physiotherapists";
CREATE UNIQUE INDEX "physiotherapists_crefito_key" ON "physiotherapists"("crefito");
CREATE TABLE "new_patientData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "measurement_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "score" INTEGER NOT NULL,
    "moviment" TEXT NOT NULL,
    "patient_id" TEXT,
    "physio_crefito" TEXT,
    CONSTRAINT "patientData_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "patientData_physio_crefito_fkey" FOREIGN KEY ("physio_crefito") REFERENCES "physiotherapists" ("crefito") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_patientData" ("id", "measurement_date", "patient_id", "physio_crefito", "score") SELECT "id", "measurement_date", "patient_id", "physio_crefito", "score" FROM "patientData";
DROP TABLE "patientData";
ALTER TABLE "new_patientData" RENAME TO "patientData";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
