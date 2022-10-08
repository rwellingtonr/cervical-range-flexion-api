import PhysiotherapistRepo from "../../repositories/physiotherapistRepo/physiotherapistRepo"
import log from "../../utils/loggers"
import { comparePassword } from "../../utils/bcrypt"
import { sign } from "jsonwebtoken"

export default class SignService {
    constructor(private physiotherapistRepo: PhysiotherapistRepo) {}
    async signIn(crefito: string, password: string) {
        log.info("logging in")
        const professionalInfo = await this.physiotherapistRepo.findOne(crefito)
        if (!professionalInfo) throw { httpCode: 404, message: "User does not exist" }

        if (!professionalInfo.isValid) {
            throw { httpCode: 401, message: "User does not have access to the site" }
        }

        const isValid = await comparePassword(password, professionalInfo.password)
        if (!isValid) throw { httpCode: 401, message: "Invalid password" }

        const physiotherapist = {
            crefito,
            name: professionalInfo.name,
            id: professionalInfo.id,
        }

        const token = sign({ physiotherapist }, process.env.JWT_SECRET, {
            subject: professionalInfo.id,
            expiresIn: "10h",
        })

        return { token, physiotherapist }
    }
}
