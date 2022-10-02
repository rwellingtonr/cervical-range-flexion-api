import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"
import log from "../utils/loggers"
interface IPayload {
    sub: string
}

const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authToken = req.headers.authorization
        if (!authToken) {
            return res.status(401).json({
                message: "token.invalid",
            })
        }

        const [, token] = authToken.split(" ")

        verify(token, process.env.JWT_SECRET) as IPayload
        return next()
    } catch (err) {
        log.error(`Token inválido ${err}`)
        return res.status(401).json({ message: "token.expired" })
    }
}
export { ensureAuthenticated }
