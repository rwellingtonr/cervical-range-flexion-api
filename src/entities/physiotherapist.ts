import bcrypt from "bcrypt"

export class Physiotherapist {
	id?: string
	name: string
	password: string
	coffito: string

	private constructor(props: any) {
		Object.assign(this, props)
	}

	private async hashPassword(psw: string): Promise<string> {
		const saltRounds = 10
		const salt = await bcrypt.genSalt(saltRounds)
		const hash = await bcrypt.hash(psw, salt)
		return hash
	}

	async create(physioInfo: Physiotherapist): Promise<Physiotherapist> {
		const hash = await this.hashPassword(physioInfo.password)
		const physioInfoWithHash = { ...physioInfo, password: hash }

		const patient = new Physiotherapist(physioInfoWithHash)
		return patient
	}
}
