import { IPatientEntryHistory } from "@helpers/patientEntry"

type PatientWithoutScoreArray = Omit<IPatientEntryHistory, "score">

export interface ICreateEntryDTO extends PatientWithoutScoreArray {
    maxScore: number
}
