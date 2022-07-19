import { prisma } from "../../database"
import { IPatientDataRepo } from "../repositoriesInterface"
import logger from "../../utils/loggers"
export class PatientDataRepo implements IPatientDataRepo {
    constructor(private patientId: string) {
        this.patientId = patientId
    }

    async history(firstDate: Date, lastDate: Date) {
        const patientHistory = await prisma.patientData.findMany({
            where: {
                patient_id: this.patientId,
                measurement_date: { gte: firstDate, lte: lastDate },
            },
        })

        return patientHistory
    }
    async addMeasurement(score: number, coffito: string) {
        return await prisma.patientData.create({
            data: {
                score,
                patient_id: this.patientId,
                physio_coffito: coffito,
            },
        })
    }

    async remove() {
        try {
            await prisma.patientData.deleteMany({
                where: {
                    patient_id: this.patientId,
                },
            })
        } catch {
            logger.warn("No content to delete")
        }
    }
}
