import { Patient } from "../../entities/patient"
import { ICRUDRepo } from "../repositoriesInterface"
import { prisma } from "../../database"

export class PatientRepo implements ICRUDRepo<Patient> {
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
	async findOne(id: string): Promise<Patient> {
		return await prisma.patient.findUnique({
			where: { id },
		})
	}
	async delete(id: string): Promise<boolean> {
		const deleted = await prisma.patient.delete({ where: { id } })
		return !!deleted
	}
	async exists(name: string): Promise<boolean> {
		const user = await prisma.patient.findFirst({ where: { name } })
		return !!user
	}
}
