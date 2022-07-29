import { handleDecrypt, handleEncrypt } from "../utils/encrypt"

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

    private static hashCPF(cpf: string) {
        return handleEncrypt(cpf)
    }

    static decryptCPF(hash: string) {
        return handleDecrypt(hash)
    }

    static create(patientInfo: Patient): Patient {
        const patient = new Patient({
            ...patientInfo,
            name: patientInfo.name.toLowerCase(),
            cpf: this.hashCPF(patientInfo.cpf),
        })
        return patient
    }
}
