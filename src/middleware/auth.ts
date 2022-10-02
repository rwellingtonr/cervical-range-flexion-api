import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"
import log from "../utils/loggers"

export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authToken = req.headers.authorization
        if (!authToken) {
            return res.status(401).json({
                message: "token.invalid",
            })
        }

        const [, token] = authToken.split(" ")

        verify(token, process.env.JWT_SECRET)
        return next()
    } catch (err) {
        log.error(`Token inválido ${err}`)
        return res.status(401).json({ message: "token.expired" })
    }
}
