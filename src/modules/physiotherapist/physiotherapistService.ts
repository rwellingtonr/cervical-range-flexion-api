import { Physiotherapist } from "../../entities/physiotherapist"
import { PhysiotherapistRepo } from "../../repositories/physiotherapistRepo/physiotherapistRepo"
import { hashPassword, decrypt } from "../../utils/bcrypt"

export class PhysiotherapistService {
	constructor(private repo: PhysiotherapistRepo) {}

	async register(userInfo: Physiotherapist) {
		const alreadyExists = await this.repo.exists(userInfo.name)

		if (alreadyExists) throw new Error("This physiotherapist already exists")

		const hash = await hashPassword(userInfo.password)

		return await this.repo.create({ ...userInfo, password: hash })
	}

	async findProfessional(id: string) {
		const physiotherapist = await this.repo.findOne(id)

		if (!physiotherapist) throw new Error("Could not find this professional")

		return physiotherapist
	}

	async unregister(id: string) {
		return await this.repo.delete(id)
	}

	async updatePassword(id: string, newPassword: string) {
		const prevData = await this.repo.findOne(id)

		if (!prevData) throw new Error("Could not find this professional")

		const isTheSamePassword = await decrypt(newPassword, prevData.password)

		if (isTheSamePassword) throw new Error("Password must be different")

		const hash = await hashPassword(newPassword)

		const updateData = { ...prevData, password: hash }

		return await this.repo.update(id, updateData)
	}
}
