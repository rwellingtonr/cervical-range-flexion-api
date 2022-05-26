import { hashPassword } from "../utils/bcrypt"

export class Physiotherapist {
    id?: string
    name: string
    password: string
    coffito: string

    private constructor(props: Physiotherapist) {
        Object.assign(this, props)
    }

    static async create({ coffito, name, password }: Physiotherapist): Promise<Physiotherapist> {
        const hash = await hashPassword(password)

        const content = {
            name: name.toLowerCase(),
            password: hash,
            coffito,
        }

        const patient = new Physiotherapist(content)
        return patient
    }
}
