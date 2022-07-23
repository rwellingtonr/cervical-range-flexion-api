import { Patient } from "../../entities/patient"
import PatientRepo from "../../repositories/patient/patientRepo"
import log from "../../utils/loggers"

export default class PatientServices {
    constructor(private patientRepo: PatientRepo) {}

    async create(patient: Patient) {
        log.info("Creating patient")

        const isDuplicated = await this.patientRepo.exists(patient.name.toLowerCase())

        if (isDuplicated) throw { message: "This patient already exists", httpCode: 409 }

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
        if (!id) throw { httpCode: 404, message: "Patient doesn't exist" }

        const patient = await this.patientRepo.findById(id)
        return patient
    }

    async unregister(id: string) {
        log.info(`Deleting id ${id}`)
        if (!id) throw { httpCode: 404, message: "Patient doesn't exist" }

        return await this.patientRepo.delete(id)
    }
}
