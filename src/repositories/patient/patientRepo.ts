import { Patient } from "../../entities/patient"
import { ICRUDRepo } from "../repositoriesInterface"
import { prisma } from "../../database"
import PatientDataRepo from "./patientDataRepo"

export default class PatientRepo implements ICRUDRepo<Patient> {
    async create(patient: Patient): Promise<Patient> {
        return await prisma.patient.create({
            data: patient,
        })
    }
    async update(id: string, patient: Patient): Promise<Patient> {
        return await prisma.patient.update({
            data: patient,
            where: { id },
        })
    }
    async findById(id: string): Promise<Patient> {
        return await prisma.patient.findFirst({ where: { id } })
    }
    async findOne(name: string): Promise<Patient> {
        return await prisma.patient.findUnique({
            where: { name },
        })
    }
    async findAll(): Promise<Patient[]> {
        const patients = await prisma.patient.findMany({ orderBy: { name: "asc" } })
        return patients
    }
    async delete(id: string): Promise<boolean> {
        const measurements = new PatientDataRepo()

        await measurements.remove(id)

        const deleted = await prisma.patient.delete({
            where: { id },
        })
        return !!deleted
    }
    async exists(name: string): Promise<boolean> {
        const user = await prisma.patient.findFirst({ where: { name } })
        return !!user
    }
}
