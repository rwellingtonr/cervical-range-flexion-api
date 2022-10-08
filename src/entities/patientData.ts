export type Movement = "flexion" | "lateral-left" | "lateral-right"

export class PatientData {
    id?: string
    measurement_date?: Date
    movement: string
    score: number
    patient_id: string
    physio_crefito: string

    constructor(patientData: PatientData) {
        Object.assign(this, patientData)
    }
}
