import { PatientDataRepo } from "../../repositories/patient/patientDataRepo"
export class PatientHistoryService {
	async getPatientHistory(patientId: string, firstDate: string, lastDate: string) {
		const repository = new PatientDataRepo()

		const starting = new Date(firstDate)
		const ending = new Date(lastDate)

		const histories = await repository.history(patientId, starting, ending)
		return histories
	}

	async appendPatientMeasurements(patientId: string, score: number, coffito: string) {
		// some date
		const repository = new PatientDataRepo()
		await repository.addMeasurement(patientId, score, coffito)
	}
}
