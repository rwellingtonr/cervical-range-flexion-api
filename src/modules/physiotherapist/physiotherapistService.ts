import { Physiotherapist } from "../../entities/physiotherapist"
import { PhysiotherapistRepo } from "../../repositories/physiotherapistRepo/physiotherapistRepo"
import { decrypt, hashPassword } from "../../utils/bcrypt"

export class PhysiotherapistService {
	constructor(private physiotherapistRepo: PhysiotherapistRepo) {}

	async register(userInfo: Physiotherapist) {
		const alreadyExists = await this.physiotherapistRepo.findOne(userInfo.coffito)

		if (alreadyExists) throw new Error("This physiotherapist already exists")

		const user = await Physiotherapist.create(userInfo)

		return await this.physiotherapistRepo.create(user)
	}

	async findProfessional(id: string) {
		const physiotherapist = await this.physiotherapistRepo.findOne(id)

		if (!physiotherapist) throw new Error("Could not find this professional")

		return physiotherapist
	}

	async updatePassword(id: string, newPassword: string) {
		const prevData = await this.physiotherapistRepo.findById(id)

		if (!prevData) throw new Error("Could not find this professional")

		const isTheSamePassword = await decrypt(newPassword, prevData.password)

		if (isTheSamePassword) throw new Error("Password must be different")

		const hash = await hashPassword(newPassword)

		const updateData = { ...prevData, password: hash }

		return await this.physiotherapistRepo.update(id, updateData)
	}
	async unregister(id: string) {
		return await this.physiotherapistRepo.delete(id)
	}
}
