import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

interface IPayload {
	sub: string
}

export function ensureAuthenticated(req: Request, resp: Response, next: NextFunction) {
	try {
		const authToken = req.headers.authorization
		if (!authToken) {
			return resp.status(401).json({
				message: "token.invalid",
			})
		}

		const [_, token] = authToken.split(" ")

		const { sub } = verify(token, process.env.JWT_SECRET) as IPayload
		req.physiotherapist_id = sub

		return next()
	} catch (error) {
		resp.status(401).json({ message: "token.expired" })
	}
}
