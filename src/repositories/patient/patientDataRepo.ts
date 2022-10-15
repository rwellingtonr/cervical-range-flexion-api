import { prisma } from "@database/index"
import { PatientData } from "@entities/patientData"
import { IPatientDataRepo } from "../repositoriesInterface"
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
            include: {
                patient: true,
            },
        })

        return patientHistory
    }
    async addMeasurement(patientData: PatientData) {
        return await prisma.patientData.create({ data: patientData })
    }
}
