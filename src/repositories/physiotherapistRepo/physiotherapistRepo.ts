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
	async exists(name: string): Promise<boolean> {
		const user = await prisma.physiotherapist.findFirst({ where: { name } })
		return !!user
	}
	async findOne(id: string): Promise<Physiotherapist> {
		return await prisma.physiotherapist.findFirst({
			where: { id },
		})
	}
	async delete(id: string): Promise<boolean> {
		const deleted = await prisma.physiotherapist.delete({ where: { id } })
		return !!deleted
	}
}
