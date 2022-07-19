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
    history(firstDate: Date, lastDate: Date): Promise<PatientData[]>
    addMeasurement(score: number, coffito: string): Promise<PatientData>
}
