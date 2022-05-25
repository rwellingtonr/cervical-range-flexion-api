import { PhysiotherapistRepo } from "../../repositories/physiotherapistRepo/physiotherapistRepo"
import { comparePassword } from "../../utils/bcrypt"
import { sign } from "jsonwebtoken"
import log from "../../utils/loggers"

const signInService = async (coffito: string, password: string) => {
	log.info("sign in...")
	const repo = new PhysiotherapistRepo()
	const professionalInfo = await repo.findOne(coffito)

	const isValid = await comparePassword(password, professionalInfo.password)

	if (!isValid) throw new Error("Invalid password")

	const token = sign(
		{
			user: {
				coffito,
				name: professionalInfo.name,
				id: professionalInfo.id,
			},
		},
		process.env.JWT_SECRET,
		{ subject: professionalInfo.id, expiresIn: "10h" }
	)

	return token
}
export { signInService }
