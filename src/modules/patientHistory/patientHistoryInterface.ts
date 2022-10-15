import { Movement } from "@entities/patientData"

export interface IRetrievePatientHistory {
    patientId: string
    firstDate: string
    lastDate: string
    movement: Movement
}
