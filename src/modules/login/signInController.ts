/* What this Controller does... */
import { Request, Response } from "express"
import { logErr } from "../../utils/loggers"
import { signInService } from "./signInService"

class SingInController {
	async handle(req: Request, res: Response) {
		try {
			const { coffito, password } = req.body

			const token = await signInService(coffito, password)

			return res.status(200).json(token)
		} catch (error) {
			logErr(error.message)
			return res.status(400).json({ error: error.message })
		}
	}
}
export { SingInController }
