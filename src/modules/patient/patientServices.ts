import { Patient } from "../../entities/patient"
import { PatientRepo } from "../../repositories/patient/patientRepo"
import { logInfo } from "../../utils/loggers"

export class PatientServices {
	async create(patient: Patient) {
		logInfo("Creating patient")
		const patientRepo = new PatientRepo()
		const isDuplicated = await patientRepo.exists(patient.name.toLowerCase())

		if (isDuplicated) throw new Error("This patient already exists")

		const user = Patient.create(patient)

		const patientInfo = await patientRepo.create(user)
		return patientInfo
	}

	async searchAll() {
		const patientRepo = new PatientRepo()
		return await patientRepo.findAll()
	}

	async findOne(id: string) {
		const patientRepo = new PatientRepo()
		const patient = await patientRepo.findById(id)
		return patient
	}

	async unregister(id: string) {
		const patientRepo = new PatientRepo()
		return await patientRepo.delete(id)
	}
}
