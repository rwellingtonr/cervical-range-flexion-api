/*
  Warnings:

  - You are about to drop the column `moviment` on the `patientData` table. All the data in the column will be lost.
  - Added the required column `movement` to the `patientData` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "patients_name_key";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_patientData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "measurement_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "score" INTEGER NOT NULL,
    "movement" TEXT NOT NULL,
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
