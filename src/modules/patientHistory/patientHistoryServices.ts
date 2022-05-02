import { PatientDataRepo } from "../../repositories/patient/patientDataRepo"
export class PatientHistoryService {
	constructor(private readonly repository: PatientDataRepo) {}

	async getPatientHistory(patientId: string, firstDate: string, lastDate: string) {
		const starting = new Date(firstDate)
		const ending = new Date(lastDate)

		const histories = await this.repository.history(patientId, starting, ending)
		return histories
	}

	async appendPatientMeasurements(patientId: string, score: number, coffito: string) {
		// some date
		await this.repository.addMeasurement(patientId, score, coffito)
	}
}
