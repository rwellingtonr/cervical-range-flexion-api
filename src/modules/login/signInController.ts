/* What this Controller does... */
import { Request, Response } from "express"
import log from "../../utils/loggers"
import { signInService } from "./signInService"

export class SingInController {
    async handle(req: Request, res: Response) {
        try {
            const { coffito, password } = req.body

            const credentials = await signInService(coffito, password)

            return res.status(200).json(credentials)
        } catch (error) {
            log.error(error.message)
            return res.status(400).json({ message: error.message })
        }
    }
}
