import type { Movement } from "../../entities/patientData"

export type EmitterStrings = Movement | "abort"

export interface ISocketDTO {
    patientId: string
    crefito: string
    movement: Movement
}
export interface IPatientData extends ISocketDTO {
    score: number[]
}
