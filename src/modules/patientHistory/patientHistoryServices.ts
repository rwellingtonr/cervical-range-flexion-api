import PatientDataRepo from "../../repositories/patient/patientDataRepo"
import log from "../../utils/loggers"

export default class PatientHistoryService {
    constructor(private readonly repository: PatientDataRepo) {}
    async getPatientHistory(patientId: string, firstDate: string, lastDate: string) {
        log.info("Getting patient history")

        const starting = new Date(firstDate)
        const ending = new Date(lastDate)

        const histories = await this.repository.history(patientId, starting, ending)
        return histories
    }

    async appendPatientMeasurements(patientId: string, score: number, coffito: string) {
        // some date
        log.info("Adding history")

        await this.repository.addMeasurement(patientId, score, coffito)
    }
}
