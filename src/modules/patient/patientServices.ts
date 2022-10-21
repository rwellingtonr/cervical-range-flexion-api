import { Patient } from "@entities/patient"
import PatientRepo from "@repositories/patient/patientRepo"
import { capitalize } from "@utils/capitalize"
import log from "@utils/loggers"

export default class PatientServices {
    constructor(private patientRepo: PatientRepo) {}

    async create(patient: Patient) {
        log.info("Creating patient")

        const isDuplicated = await this.patientRepo.findOne(patient.cpf)

        if (isDuplicated) throw { message: "This patient already exists", httpCode: 409 }

        const user = Patient.create(patient)

        return await this.patientRepo.create(user)
    }

    async searchAll() {
        log.info("Searching all")
        const allPatients = await this.patientRepo.findAll()

        if (!allPatients.length) return []

        const patients = allPatients.map(this.capitalizePatient)

        return patients
    }

    async findOne(id: string) {
        log.info(`Looking for ir ${id}`)
        const patient = await this.patientRepo.findById(id)
        if (!patient) throw { httpCode: 404, message: "Patient doesn't exist" }

        const originalData: Patient = {
            ...this.capitalizePatient(patient),
            cpf: Patient.decryptCPF(patient.cpf),
        }
        return originalData
    }

    async unregister(id: string) {
        log.info(`Deleting id ${id}`)
        return await this.patientRepo.delete(id)
    }

    private capitalizePatient(patient: Patient) {
        const name = capitalize(patient.name)
        return { ...patient, name }
    }
}
