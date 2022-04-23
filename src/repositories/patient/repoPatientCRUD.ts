import { Patient } from "../../entities/patient"
import { IPatientCRUDRepo } from "../repositoriesInterface"
import { prisma } from "../../database"

export class PatientRepo implements IPatientCRUDRepo {
	async create(patient: Patient): Promise<Patient> {
		return await prisma.pacient.create({
			data: patient,
		})
	}
	async update(id: string, patient: Patient): Promise<Patient> {
		return await prisma.pacient.update({
			data: patient,
			where: { id },
		})
	}
	async findOne(id: string): Promise<Patient> {
		return await prisma.pacient.findUnique({
			where: { id },
		})
	}
	async delete(id: string): Promise<void> {
		await prisma.pacient.delete({ where: { id } })
	}
}
