import { Patient } from "../../entities/patient"
import { ICRUDRepo } from "../repositoriesInterface"
import { prisma } from "../../database"

interface IPatientRepo extends ICRUDRepo<Patient> {
	find(): Promise<Patient[]>
}

export class PatientRepo implements IPatientRepo {
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
	async find(): Promise<Patient[]> {
		const patients = await prisma.patient.findMany()
		return patients
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
