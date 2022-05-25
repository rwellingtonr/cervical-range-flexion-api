import { Patient } from "../../entities/patient"
import { PatientRepo } from "../../repositories/patient/patientRepo"
import log from "../../utils/loggers"

export class PatientServices {
	async create(patient: Patient) {
		log.info("Creating patient")
		const patientRepo = new PatientRepo()
		const isDuplicated = await patientRepo.exists(patient.name.toLowerCase())

		if (isDuplicated) throw new Error("This patient already exists")

		const user = Patient.create(patient)

		const patientInfo = await patientRepo.create(user)
		return patientInfo
	}

	async searchAll() {
		log.info("Searching all")
		const patientRepo = new PatientRepo()
		return await patientRepo.findAll()
	}

	async findOne(id: string) {
		log.info(`Looking for ir ${id}`)
		const patientRepo = new PatientRepo()
		const patient = await patientRepo.findById(id)
		return patient
	}

	async unregister(id: string) {
		log.info(`Deleting id ${id}`)
		const patientRepo = new PatientRepo()
		return await patientRepo.delete(id)
	}
}
