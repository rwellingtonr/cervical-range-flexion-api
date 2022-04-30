import { hashPassword } from "../utils/bcrypt"

export class Physiotherapist {
	id?: string
	name: string
	password: string
	coffito: string

	private constructor(props: any) {
		Object.assign(this, props)
	}

	static async create(physioInfo: Physiotherapist): Promise<Physiotherapist> {
		const hash = hashPassword(physioInfo.password)
		const patient = new Physiotherapist({ ...physioInfo, password: hash })
		return patient
	}
}
