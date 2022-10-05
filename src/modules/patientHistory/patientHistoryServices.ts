import { PatientData } from "../../entities/patientData"
import { IPatientDataRepo } from "../../repositories/repositoriesInterface"
import log from "../../utils/loggers"
import { ICreateEntryDTO } from "./patientHistoryDTO"
export default class PatientHistoryService {
    private fistDay: Date
    private lastDay: Date

    constructor(private readonly repository: IPatientDataRepo) {}

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

    async appendPatientMeasurements({ movement, patientId, crefito, maxScore }: ICreateEntryDTO) {
        log.info("Adding history")

        const patientData = new PatientData({
            movement,
            score: maxScore,
            physio_crefito: crefito,
            patient_id: patientId,
        })
        await this.repository.addMeasurement(patientData)
    }
}
