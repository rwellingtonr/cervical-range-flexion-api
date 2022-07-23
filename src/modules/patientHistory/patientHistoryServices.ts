import { PatientData } from "../../entities/patientData"
import PatientDataRepo from "../../repositories/patient/patientDataRepo"
import log from "../../utils/loggers"

export default class PatientHistoryService {
    private fistDay: Date
    private lastDay: Date

    constructor(private readonly repository: PatientDataRepo) {}

    private setDate(firstDate: string, lastDate: string) {
        if (!firstDate) {
            this.fistDay = new Date("1950-01-01")
        } else {
            this.fistDay = new Date(firstDate)
        }

        if (!lastDate) {
            this.lastDay = new Date()
        } else {
            this.lastDay = new Date(lastDate)
        }
    }

    private toLocalDateString(patientData: PatientData[]) {
        return patientData.map((data) => ({
            ...data,
            measurement_date: data.measurement_date.toLocaleDateString(),
        }))
    }

    async getPatientHistory(patientId: string, firstDate: string, lastDate: string) {
        log.info("Getting patient history")

        this.setDate(firstDate, lastDate)

        const data = await this.repository.history(patientId, this.fistDay, this.lastDay)
        return this.toLocalDateString(data)
    }

    async appendPatientMeasurements(patientId: string, score: number, coffito: string) {
        // some date
        log.info("Adding history")

        await this.repository.addMeasurement(patientId, score, coffito)
    }
}
