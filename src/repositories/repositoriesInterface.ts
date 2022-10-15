import { type Movement, PatientData } from "@entities/patientData"
import { IPatientHistorySimplified } from "@modules/patientHistory/patientHistoryInterface"

export interface ICRUDRepo<T> {
    create(data: T): Promise<T>
    findAll(): Promise<T[]>
    findById(id: string): Promise<T>
    findOne(name: string): Promise<T>
    delete(id: string): Promise<void>
    update(id: string, data: T): Promise<T>
}

export interface IPatientDataRepo {
    history(
        patientId: string,
        firstDate: Date,
        lastDate: Date,
        movement: Movement
    ): Promise<IPatientHistorySimplified[]>
    addMeasurement(patientData: PatientData): Promise<PatientData>
}
