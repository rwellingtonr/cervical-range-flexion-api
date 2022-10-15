import { Patient } from "@entities/patient"
import { ICRUDRepo } from "../repositoriesInterface"
import { prisma } from "@database/index"

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
    async findOne(cpf: string): Promise<Patient> {
        return await prisma.patient.findUnique({ where: { cpf } })
    }
    async findAll(): Promise<Patient[]> {
        const patients = await prisma.patient.findMany({ orderBy: { name: "asc" } })
        return patients
    }
    async delete(id: string): Promise<void> {
        await prisma.patient.delete({ where: { id } })
    }
}
