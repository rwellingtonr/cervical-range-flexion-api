export class Patient {
    id?: string
    cpf: string
    name: string
    gender: string
    surgery_date: Date
    birthday: Date

    private constructor(props: Patient) {
        Object.assign(this, props)
    }

    static create(patientInfo: Patient): Patient {
        const patient = new Patient({ ...patientInfo, name: patientInfo.name.toLowerCase() })
        return patient
    }
}
