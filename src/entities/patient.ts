export class Patient {
	id?: string
	cpf: number
	name: string
	gender: string
	sugery_date: Date
	bithday: Date

	private constructor(props: Patient) {
		Object.assign(this, props)
	}

	static create(patientInfo: Patient): Patient {
		const patient = new Patient(patientInfo)
		return patient
	}
}
