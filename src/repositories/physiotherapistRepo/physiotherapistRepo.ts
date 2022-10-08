import { ICRUDRepo } from "../repositoriesInterface"
import { prisma } from "../../database"
import { Physiotherapist } from "../../entities/physiotherapist"

interface IPhysiotherapistRepo extends ICRUDRepo<Physiotherapist> {
    findByCrefito(crefito: string): Promise<Physiotherapist>
    updatePassword(id: string, password: string): Promise<Physiotherapist>
}

export default class PhysiotherapistRepo implements IPhysiotherapistRepo {
    async findByCrefito(crefito: string): Promise<Physiotherapist> {
        return await prisma.physiotherapist.findUnique({ where: { crefito } })
    }
    async updatePassword(id: string, password: string): Promise<Physiotherapist> {
        const toUpdate = { data: { password }, where: { id } }
        const physiotherapist = await prisma.physiotherapist.update(toUpdate)
        return physiotherapist
    }
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
    async delete(id: string): Promise<void> {
        await prisma.physiotherapist.update({
            where: { id },
            data: { isValid: false },
        })
    }
}
