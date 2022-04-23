import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

interface IPayload {
	sub: string
}

// It must check if the user is authenticated
export default function ensureAuthenticated(req: Request, resp: Response, next: NextFunction) {
	try {
		const authToken = req.headers.authorization
		if (!authToken) {
			return resp.status(401).json({
				message: "token.invalid",
			})
		}

		const [, token] = authToken.split(" ")

		const { sub } = verify(token, process.env.JWT_SECRET) as IPayload
		req.physiotherapist_id = sub

		return next()
	} catch (error) {
		resp.status(401).json({ message: "token.expired" })
	}
}
