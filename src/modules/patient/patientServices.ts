import { Patient } from "../../entities/patient"
import { PatientRepo } from "../../repositories/patient/patientRepo"
import log from "../../utils/loggers"

export default class PatientServices {
    constructor(private patientRepo: PatientRepo) {}

    async create(patient: Patient) {
        log.info("Creating patient")

        const isDuplicated = await this.patientRepo.exists(patient.name.toLowerCase())

        if (isDuplicated) throw new Error("This patient already exists")

        const user = Patient.create(patient)

        const patientInfo = await this.patientRepo.create(user)
        return patientInfo
    }

    async searchAll() {
        log.info("Searching all")

        return await this.patientRepo.findAll()
    }

    async findOne(id: string) {
        log.info(`Looking for ir ${id}`)
        if (!id) return

        const patient = await this.patientRepo.findById(id)
        return patient
    }

    async unregister(id: string) {
        log.info(`Deleting id ${id}`)
        if (!id) return

        return await this.patientRepo.delete(id)
    }
}
