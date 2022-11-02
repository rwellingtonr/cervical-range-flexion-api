import { Movement } from "@entities/patientData"

export interface IRetrievePatientHistory {
    patientId: string
    firstDate: string
    lastDate: string
    movement: Movement
}

export interface IPatientHistorySimplified {
    id: string
    measurement_date: Date
    score: number
    movement: string
    patient: {
        name: string
    }
}
