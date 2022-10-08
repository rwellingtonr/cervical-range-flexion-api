import { Physiotherapist } from "../../entities/physiotherapist"
import PhysiotherapistRepo from "../../repositories/physiotherapistRepo/physiotherapistRepo"
import { comparePassword, hashPassword } from "../../utils/bcrypt"
import log from "../../utils/loggers"

export default class PhysiotherapistService {
    constructor(private readonly physiotherapistRepo: PhysiotherapistRepo) {}
    async register(userInfo: Physiotherapist) {
        log.info(`Creating user: ${userInfo.name}`)

        const alreadyExists = await this.physiotherapistRepo.findOne(userInfo.crefito)

        if (alreadyExists) throw { httpCode: 409, message: "This physiotherapist already exists" }

        const user = await Physiotherapist.create(userInfo)

        await this.physiotherapistRepo.create(user)
    }
    async findAllPhysiotherapists() {
        return await this.physiotherapistRepo.findAll()
    }

    async findProfessional(id: string) {
        const physiotherapist = await this.physiotherapistRepo.findById(id)

        if (!physiotherapist) throw { httpCode: 404, message: "Could not find this professional" }

        return physiotherapist
    }

    async updatePassword(crefito: string, newPassword: string) {
        const prevData = await this.physiotherapistRepo.findByCrefito(crefito)

        if (!prevData) throw { httpCode: 404, message: "Could't find this person" }

        const isTheSamePassword = await comparePassword(newPassword, prevData.password)

        if (isTheSamePassword) throw new Error("Password must be different")

        const hash = await hashPassword(newPassword)

        const updateData = { ...prevData, password: hash }

        return await this.physiotherapistRepo.update(prevData.id, updateData)
    }
    async unregister(id: string) {
        return await this.physiotherapistRepo.delete(id)
    }
}
