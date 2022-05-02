import { prisma } from "../../database"
import { IPatientDataRepo } from "../repositoriesInterface"

export class PatientDataRepo implements IPatientDataRepo {
	async history(patientId: string, firstDate: Date, lastDate: Date) {
		const patientHistory = await prisma.patientData.findMany({
			where: {
				patient_id: patientId,
				measurement_date: { gt: firstDate, lt: lastDate },
			},
		})

		return patientHistory
	}
	async addMeasurement(patientId: string, score: number, coffito: string) {
		return await prisma.patientData.create({
			data: {
				score,
				patient_id: patientId,
				physio_coffito: coffito,
			},
		})
	}
}
