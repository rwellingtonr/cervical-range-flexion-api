import { Physiotherapist } from "../../entities/physiotherapist"
import { PhysiotherapistRepo } from "../../repositories/physiotherapistRepo/physiotherapistRepo"
import { comparePassword, hashPassword } from "../../utils/bcrypt"
import { logInfo } from "../../utils/loggers"

export class PhysiotherapistService {
	constructor() {}

	async register(userInfo: Physiotherapist) {
		logInfo(`Creating user: ${userInfo.name}`)
		const physiotherapistRepo = new PhysiotherapistRepo()

		const alreadyExists = await physiotherapistRepo.findOne(userInfo.coffito)

		if (alreadyExists) throw new Error("This physiotherapist already exists")

		const user = await Physiotherapist.create(userInfo)

		const { name, coffito } = await physiotherapistRepo.create(user)

		return { name, coffito }
	}
	async findAllPhysiotherapists() {
		logInfo("looking for all profissional")
		const physiotherapistRepo = new PhysiotherapistRepo()
		const physiotherapists = await physiotherapistRepo.findAll()

		return physiotherapists
	}

	async findProfessional(id: string) {
		const physiotherapistRepo = new PhysiotherapistRepo()
		const physiotherapist = await physiotherapistRepo.findById(id)

		if (!physiotherapist) throw new Error("Could not find this professional")

		return physiotherapist
	}

	async updatePassword(id: string, newPassword: string) {
		const physiotherapistRepo = new PhysiotherapistRepo()
		const prevData = await physiotherapistRepo.findById(id)

		if (!prevData) throw new Error("Could not find this professional")

		const isTheSamePassword = await comparePassword(newPassword, prevData.password)

		if (isTheSamePassword) throw new Error("Password must be different")

		const hash = await hashPassword(newPassword)

		const updateData = { ...prevData, password: hash }

		return await physiotherapistRepo.update(id, updateData)
	}
	async unregister(id: string) {
		const physiotherapistRepo = new PhysiotherapistRepo()
		return await physiotherapistRepo.delete(id)
	}
}
