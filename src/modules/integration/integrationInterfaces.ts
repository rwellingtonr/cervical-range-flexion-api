import type { Movement } from "@entities/patientData"
import { IPatientEntryHistory } from "@helpers/patientEntry"

export type EmitterStrings = Movement | "abort" | "end"

export interface IPatientData extends IPatientEntryHistory {
    score: number[]
}
