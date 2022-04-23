export class PatientData {
	id?: string
	measurement_date?: Date
	score: number
	pacient_id: string
	physio_coffito: string

	private constructor(props: PatientData) {
		Object.assign(this, props)
	}

	static create(patientDataInfo: PatientData): PatientData {
		const patientData = new PatientData(patientDataInfo)
		return patientData
	}
}
