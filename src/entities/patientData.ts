export type Movement = "flexion" | "lateral-let" | "lateral-right"

export class PatientData {
    id?: string
    measurement_date?: Date
    movement: Movement
    score: number
    patient_id: string
    physio_crefito: string

    constructor(patientData: PatientData) {
        Object.assign(this, patientData)
    }
}
