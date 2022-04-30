import { Patient } from "../../entities/patient"
import { PatientRepo } from "../../repositories/patient/patientRepo"

export class PatientServices {
	constructor(private patientRepo: PatientRepo) {}

	async create(patient: Patient) {
		const isDuplicated = this.patientRepo.exists(patient.name)

		if (isDuplicated) throw new Error("This patient already exists")

		const user = Patient.create(patient)

		await this.patientRepo.create(user)
		return
	}

	async searchAll() {
		return await this.patientRepo.find()
	}

	async findOne(id: string) {
		const patient = await this.patientRepo.findById(id)
		return patient
	}

	async unregister(id: string) {
		return await this.patientRepo.delete(id)
	}
}
