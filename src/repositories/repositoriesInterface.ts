import { Patient } from "../entities/patient"

export interface IPatientRepo {
	create(patient: Patient): Promise<Patient>
	findOne(id: string): Promise<Patient>
	delete(id: string): Promise<void>
	update(id: string, patient: Patient): Promise<Patient>
}
