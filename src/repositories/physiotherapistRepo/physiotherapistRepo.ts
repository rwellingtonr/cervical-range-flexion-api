import { ICRUDRepo } from "../repositoriesInterface"
import { prisma } from "../../database"
import { Physiotherapist } from "../../entities/physiotherapist"

export class PhysiotherapistRepo implements ICRUDRepo<Physiotherapist> {
	async create(physiotherapist: Physiotherapist): Promise<Physiotherapist> {
		return await prisma.physiotherapist.create({
			data: physiotherapist,
		})
	}
	async update(id: string, Physiotherapist: Physiotherapist): Promise<Physiotherapist> {
		return await prisma.physiotherapist.update({
			data: Physiotherapist,
			where: { id },
		})
	}
	async findOne(coffito: string): Promise<Physiotherapist> {
		const user = await prisma.physiotherapist.findFirst({ where: { coffito } })
		return user
	}
	async findById(id: string): Promise<Physiotherapist> {
		return await prisma.physiotherapist.findFirst({
			where: { id },
		})
	}
	async delete(id: string): Promise<boolean> {
		const deleted = await prisma.physiotherapist.delete({ where: { id } })
		return !!deleted
	}
}
