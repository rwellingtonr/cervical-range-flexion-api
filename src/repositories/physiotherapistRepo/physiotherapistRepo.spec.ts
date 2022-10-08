import PhysiotherapistRepo from "./physiotherapistRepo"
import { Physiotherapist } from "../../entities/physiotherapist"
import { randomUUID } from "crypto"
import { prisma } from "../../database"

describe("Test the Physiotherapist repository", () => {
    let repo: PhysiotherapistRepo
    let id: string
    beforeAll(() => {
        repo = new PhysiotherapistRepo()
    })
    afterEach(async () => {
        if (id) await prisma.physiotherapist.delete({ where: { id } })
    })

    it("should create a physiotherapist", async () => {
        const physiotherapist: Physiotherapist = {
            crefito: randomUUID(),
            name: "jest name",
            isValid: true,
            password: "any one",
        }
        const result = await repo.create(physiotherapist)
        id = result.id as string
        expect(result).toMatchObject(physiotherapist)
    })

    it("should find one", async () => {
        const physiotherapist: Physiotherapist = {
            crefito: randomUUID(),
            name: "jest name",
            isValid: true,
            password: "any one",
        }
        const created = await repo.create(physiotherapist)
        id = created.id as string

        const result = await repo.findOne(created.crefito)
        expect(result).toMatchObject(physiotherapist)
    })

    it("should find by id", async () => {
        const physiotherapist: Physiotherapist = {
            crefito: randomUUID(),
            name: "jest name",
            isValid: true,
            password: "any one",
        }
        const created = await repo.create(physiotherapist)
        id = created.id as string
        const result = await repo.findById(id)
        expect(result).toMatchObject(physiotherapist)
    })

    it("should update a physiotherapist", async () => {
        const physiotherapist: Physiotherapist = {
            crefito: randomUUID(),
            name: "jest name",
            isValid: true,
            password: "any one",
        }
        const created = await repo.create(physiotherapist)
        id = created.id as string
        const result = await repo.update(created.id as string, {
            ...physiotherapist,
            crefito: "12903781290",
        })
        expect(result).toMatchObject({ ...physiotherapist, crefito: "12903781290" })
    })
})
