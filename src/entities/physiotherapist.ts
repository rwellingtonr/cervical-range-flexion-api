import { hashPassword } from "@utils/bcrypt"

export class Physiotherapist {
    id?: string
    name: string
    password: string
    crefito: string
    isValid: boolean

    private constructor(props: Physiotherapist) {
        Object.assign(this, props)
    }

    static async create({ crefito, name, password }: Physiotherapist): Promise<Physiotherapist> {
        const hash = await hashPassword(password)
        const content: Physiotherapist = {
            name: name.toLowerCase(),
            password: hash,
            isValid: true,
            crefito,
        }
        const physiotherapist = new Physiotherapist(content)
        return physiotherapist
    }
}
