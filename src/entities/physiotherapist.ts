export class Physiotherapist {
	id?: string
	name: string
	password: string
	coffito: string

	private constructor(props: any) {
		Object.assign(this, props)
	}

	static create(physioInfo: Physiotherapist): Physiotherapist {
		const patient = new Physiotherapist(physioInfo)
		return patient
	}
}
