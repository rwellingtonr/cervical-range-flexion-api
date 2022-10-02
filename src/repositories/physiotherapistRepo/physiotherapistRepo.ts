import { ICRUDRepo } from "../repositoriesInterface"
import { prisma } from "../../database"
import { Physiotherapist } from "../../entities/physiotherapist"

export default class PhysiotherapistRepo implements ICRUDRepo<Physiotherapist> {
    async create(physiotherapist: Physiotherapist): Promise<Physiotherapist> {
        return await prisma.physiotherapist.create({
            data: physiotherapist,
        })
    }
    async findAll(): Promise<Physiotherapist[]> {
        const physiotherapists = await prisma.physiotherapist.findMany({ orderBy: { name: "asc" } })
        return physiotherapists
    }
    async update(id: string, Physiotherapist: Physiotherapist): Promise<Physiotherapist> {
        return await prisma.physiotherapist.update({
            data: Physiotherapist,
            where: { id },
        })
    }
    async findOne(crefito: string): Promise<Physiotherapist> {
        const user = await prisma.physiotherapist.findUnique({ where: { crefito } })
        return user
    }
    async findById(id: string): Promise<Physiotherapist> {
        return await prisma.physiotherapist.findUnique({
            where: { id },
        })
    }
    async delete(id: string): Promise<boolean> {
        const deleted = await prisma.physiotherapist.delete({ where: { id } })
        return !!deleted
    }
}
