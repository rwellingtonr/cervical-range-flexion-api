import { Physiotherapist } from "../../entities/physiotherapist"
import PhysiotherapistRepo from "../../repositories/physiotherapistRepo/physiotherapistRepo"
import { comparePassword, hashPassword } from "../../utils/bcrypt"
import log from "../../utils/loggers"

export default class PhysiotherapistService {
    constructor(private readonly physiotherapistRepo: PhysiotherapistRepo) {}
    async register(userInfo: Physiotherapist) {
        log.info(`Creating user: ${userInfo.name}`)

        const alreadyExists = await this.physiotherapistRepo.findOne(userInfo.coffito)

        if (alreadyExists) throw { httpCode: 409, message: "This physiotherapist already exists" }

        const user = await Physiotherapist.create(userInfo)

        await this.physiotherapistRepo.create(user)
    }
    async findAllPhysiotherapists() {
        log.info("looking for all profissional")

        const physiotherapists = await this.physiotherapistRepo.findAll()

        return physiotherapists
    }

    async findProfessional(id: string) {
        log.info(`Searching for physiotherapist ${id} `)
        if (!id) throw { httpCode: 404, message: "Could't find this one" }

        const physiotherapist = await this.physiotherapistRepo.findById(id)

        if (!physiotherapist) throw new Error("Could not find this professional")

        return physiotherapist
    }

    async updatePassword(id: string, newPassword: string) {
        const prevData = await this.physiotherapistRepo.findById(id)

        if (!prevData) throw { httpCode: 404, message: "Could't find this one" }

        const isTheSamePassword = await comparePassword(newPassword, prevData.password)

        if (isTheSamePassword) throw new Error("Password must be different")

        const hash = await hashPassword(newPassword)

        const updateData = { ...prevData, password: hash }

        return await this.physiotherapistRepo.update(id, updateData)
    }
    async unregister(id: string) {
        return await this.physiotherapistRepo.delete(id)
    }
}
