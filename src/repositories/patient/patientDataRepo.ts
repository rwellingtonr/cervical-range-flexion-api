import { prisma } from "@database/index"
import { type Movement, PatientData } from "@entities/patientData"
import { IPatientDataRepo } from "../repositoriesInterface"
export default class PatientDataRepo implements IPatientDataRepo {
    async history(patientId: string, firstDate: Date, lastDate: Date, movement: Movement) {
        const patientHistory = await prisma.patientData.findMany({
            where: {
                patient_id: patientId,
                measurement_date: { gte: firstDate, lte: lastDate },
                movement,
            },
            orderBy: {
                measurement_date: "asc",
            },
            select: {
                id: true,
                measurement_date: true,
                movement: true,
                score: true,
                patient: {
                    select: {
                        name: true,
                    },
                },
            },
        })

        return patientHistory
    }
    async addMeasurement(patientData: PatientData) {
        return await prisma.patientData.create({ data: patientData })
    }
}
