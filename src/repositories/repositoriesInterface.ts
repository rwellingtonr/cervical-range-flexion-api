import { PatientData } from "../entities/patientData"

export interface ICRUDRepo<T> {
    create(data: T): Promise<T>
    findAll(): Promise<T[]>
    findById(id: string): Promise<T>
    findOne(name: string): Promise<T>
    delete(id: string): Promise<boolean>
    update(id: string, data: T): Promise<T>
}

export interface IPatientDataRepo {
    history(patientId: string, firstDate: Date, lastDate: Date): Promise<PatientData[]>
    addMeasurement(id: string, score: number, coffito: string): Promise<PatientData>
}
