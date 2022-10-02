import { hashPassword } from "../utils/bcrypt"

export class Physiotherapist {
    id?: string
    name: string
    password: string
    crefito: string

    private constructor(props: Physiotherapist) {
        Object.assign(this, props)
    }

    static async create({ crefito, name, password }: Physiotherapist): Promise<Physiotherapist> {
        const hash = await hashPassword(password)
        const content = {
            name: name.toLowerCase(),
            password: hash,
            crefito,
        }
        const physiotherapist = new Physiotherapist(content)
        return physiotherapist
    }
}
