import { prisma } from "../../database"
import { IPatientDataRepo } from "../repositoriesInterface"
import logger from "../../utils/loggers"
export default class PatientDataRepo implements IPatientDataRepo {
    async history(patientId: string, firstDate: Date, lastDate: Date) {
        const patientHistory = await prisma.patientData.findMany({
            where: {
                patient_id: patientId,
                measurement_date: { gte: firstDate, lte: lastDate },
            },
            orderBy: {
                measurement_date: "asc",
            },
        })

        return patientHistory
    }
    async addMeasurement(patientId: string, score: number, coffito: string) {
        return await prisma.patientData.create({
            data: {
                score,
                patient_id: patientId,
                physio_coffito: coffito,
            },
        })
    }

    async remove(patientId: string) {
        try {
            await prisma.patientData.deleteMany({
                where: {
                    patient_id: patientId,
                },
            })
        } catch {
            logger.warn("No content to delete")
        }
    }
}
